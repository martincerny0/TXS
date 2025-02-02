import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { Chart, ChartTimeFrame } from "@/types/chart";
import type { Asset } from "@/types/asset";
import { TRPCError } from "@trpc/server";

export const chartRouter = createTRPCRouter({
  changeAsset: protectedProcedure
    .input(
      z.object({
        chartId: z.number(),
        assetId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // find the chart
      const chart = await ctx.db.chart.findUnique({
        where: {
          id: input.chartId,
        },
      });

      // check if chart is related to the user
      if (!chart || chart.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chart not found",
        });
      }

      const asset = await ctx.db.chart.update({
        where: {
          id: input.chartId,
        },
        data: {
          assetId: input.assetId,
        },
      });
      if (!asset) throw new TRPCError({ code: "NOT_FOUND", message: "Asset not found" });

      return { success: true };
    }),

  getUserCharts: protectedProcedure.query(async ({ ctx }) => {
    const id = ctx.session.user.id;

    const charts = await ctx.db.chart.findMany({
      where: {
        userId: id,
      },
      include: {
        asset: true,
      },
    });
    // make data valid for the frontend
    const validCharts: Chart[] = charts.map((chart) => {
      return {
        id: chart.id,
        selectedTimeframe: chart.selectedTimeframe as ChartTimeFrame,
        selectedTool: "cursor",
        zoomArea: {
          x1: null,
          y1: null,
        },
        paintings: [],
        trendlines: [],
        texts: [],
        isTakeProfitVisible: false,
        isStopLossVisible: false,
        order: {
          value: 0,
          quantity: 0,
          type: "buy",
          takeProfit: 0,
          stopLoss: 0,
        },
        asset: chart.asset as Asset,
        createdAt: chart.createdAt,
      };
    });
    return validCharts;
  }),
  createNewChart: protectedProcedure
    .input(
      z.object({
        initialAssetId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      const chart = await ctx.db.chart.create({
        data: {
          userId: userId,
          assetId: input.initialAssetId,
          selectedTimeframe: "1m" as ChartTimeFrame,
        },
      });
      return chart;
    }),
  removeChart: protectedProcedure
    .input(
      z.object({
        chartId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const chart = await ctx.db.chart.findUnique({
        where: {
          id: input.chartId,
        },
      });

      if (!chart || chart.userId !== userId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Chart not found",
        });
      }

      await ctx.db.chart.delete({
        where: {
          id: input.chartId,
        },
      });
      return { success: true };
    }),
});
