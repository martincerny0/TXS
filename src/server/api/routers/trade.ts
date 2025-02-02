import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { OpenTrade } from "@/types/trade";
import type { TradeAsset } from "@/types/asset";
import { Decimal } from "@prisma/client/runtime/library";

export const tradeRouter = createTRPCRouter({
  getUserOpenTrades: protectedProcedure
  .input(z.object({
    userId: z.number(),
  }))
    .query(async ({ ctx, input }) => {
        const { userId } = input;

        const trades = await ctx.db.trade.findMany({
          where: {
            userId,
            isActive: true,
          },
          include: {
            asset: true,
          },
        

        });
        const openTrades : OpenTrade[] = trades.map((trade) => {
          return {
            id: trade.id,
            asset: {
              id: trade.asset.id,
              name: trade.asset.name,
              symbol: trade.asset.symbol,
              category: trade.asset.category,
              createdAt: trade.asset.createdAt,
              updatedAt: trade.asset.updatedAt,
              currentPrice: 0,
              entryPrice: 0,

            } as TradeAsset,
            type: trade.type,
            quantity: 0,
            takeProfit: 0,
            stopLoss: 0,
            profit: 0,
            loss: 0,
            
          };
        }
        );
        return openTrades;
        

            //  id: number;
            //  name: string;
            //  symbol: string;
            //  category: AssetCategory;
            //  createdAt?: Date;
            //  updatedAt?: Date;
            //  currentPrice: number;
            //  entryPrice: number;
    }),
});
