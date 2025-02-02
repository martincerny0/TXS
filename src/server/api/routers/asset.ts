import { record, symbol, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { AssetCategory, StaticAsset } from "@/types/asset";

export const assetRouter = createTRPCRouter({
  getAllAssets: publicProcedure.query(async ({ ctx }) => {
    const assets = await ctx.db.asset.findMany();
    return assets.map((asset) => {
      return {
        id: asset.id,
        symbol: asset.symbol,
        name: asset.name,
        category: asset.category,
      };
    });
  }),
  getAssetsByCategory: publicProcedure
    .input(z.object({ 
      assetCategory: z.custom<AssetCategory>(),
      quantity: z.number().optional(), 
      selectedAssetId: z.number().optional(),
    }))
    .query(async ({ input, ctx }) => {
        const assets = await ctx.db.asset.findMany({
          where: {
            category: input.assetCategory,
            id: {
              not: input.selectedAssetId,
            },
          },
          take: input.quantity,
        });

        return assets;
    }),
    getAssetNameByChartId: publicProcedure
    .input(z.object({ chartId: z.number() }))
    .query(async ({ input, ctx }) => {
      const chart = await ctx.db.chart.findUnique({
        where: {
          id: input.chartId,
        },
        include: {
          asset: true,
        },
      });

      return chart?.asset.name;
    }),
    getAssetBySearchTerm: publicProcedure
    .input(z.object({ searchTerm: z.string(), category: z.custom<AssetCategory | "All">().optional() }))
    .query(async ({ input, ctx }) => {
      const category = input.category === "All" ? undefined : input.category;
      const assets = await ctx.db.asset.findMany({
        where: {
          OR: [
            {
              name: {
                contains: input.searchTerm,
              },
            },
            {
              symbol: {
                contains: input.searchTerm,
              },
            },
          ],
          category: category,
        },
      });

      return assets;
    }),
    getAssetById: publicProcedure
    .input(z.object({ assetId: z.number() }))
    .query(async ({ input, ctx }) => {
      const asset = await ctx.db.asset.findUnique({
        where: {
          id: input.assetId,
        },
      });

      return asset;
    }),
    getTopAssets: publicProcedure.
    input(z.object({ quantity: z.number() }))
    .query(async ({ input, ctx }) => {

      // get most used assets by chart
      const mostUsedAssetsInCharts = await ctx.db.chart.groupBy({
        by: ["assetId"],
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            assetId: "desc",
          },
        },
        take: input.quantity,
        
      });
      const topAssets = await ctx.db.asset.findMany({
        where: {
          id: {
            in: mostUsedAssetsInCharts.map((chart) => chart.assetId),
          },
        },
      });
      // get the asset current prices
      const assetPrices = await Promise.all(
        topAssets.map(async (asset) => { 
          const closestRecord = await ctx.db.assetPrice.findFirst({
            where: {
              assetId: asset.id,
            },
            orderBy: [
              {
                recordedAt: 'asc', // Order by latest time
              },
            ],
          });
          return closestRecord;
        })
      );

      const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));

      // get prices at the start of the day
      const pricesAtTheStartOfDay = await Promise.all(
        topAssets.map(async (asset) => {
          const closestRecord = await ctx.db.assetPrice.findFirst({
            where: {
              assetId: asset.id,
              recordedAt: {
                gte: startOfDay,
              },
            },
            orderBy: [
              {
                recordedAt: 'asc',
              },
            ],
          });
          return closestRecord;
        })
      );
      // merge asset prices with the assets
      const mergedData = assetPrices.map((price) => {
        return {
          ...topAssets.find((asset) => asset.id === price?.assetId), // find the asset and add its properies
          price: parseFloat(price?.value.toString()?? ""),
          priceAtStartOfDay: parseFloat(pricesAtTheStartOfDay.find((priceStart) => price?.assetId === priceStart?.assetId)?.value.toString()?? ""),
        };
      });
      return mergedData as StaticAsset[];
    }),
    getAssetBySymbol: publicProcedure
    .input(z.object({ symbol: z.string().max(10) }))
    .query(async ({ input, ctx }) => {
      const asset = await ctx.db.asset.findFirst({
        where: {
          symbol: input.symbol,
        },
      });
      return asset;
    }),
});
