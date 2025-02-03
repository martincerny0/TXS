import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";



export const subscriptionRouter = createTRPCRouter({
    getSubscriptionPlans: publicProcedure
    .query(async ({ ctx }) => {
      return ctx.db.subscriptionPlan.findMany();
    }),
});