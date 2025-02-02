import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import type { InvestingExperience, InvestingReason } from "@prisma/client";
import type { Country } from "@/types/country";
import { PrismaClient } from "@prisma/client";
import type { updateUserData } from "@/types/user";
import { TRPCError } from "@trpc/server";
import path from "path";
import fs from 'fs';

const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
};

export const createContext = (): Context => ({
  prisma,
});
const context = createContext();

export const userRouter = createTRPCRouter({
  uploadImage: protectedProcedure
  .input(
    z.object({
      fileData: z.string(),  // Base64 encoded file data
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { fileData } = input;

    // define dir and path for the file
    const directoryPath = path.join(process.cwd(), 'public/image/user');
    const filePath = path.join(directoryPath, `${ctx.session.user.id}.webp`);

    // // Ensure the directory exists (create it if it doesn't)
    // if (!fs.existsSync(directoryPath)) {
    //   fs.mkdirSync(directoryPath, { recursive: true });
    // }

    // convert the  base64 into file the file (****replace if it already exists)
    const fileBuffer = Buffer.from(fileData, 'base64');
    fs.writeFileSync(filePath, fileBuffer);
     // Update session with a new image path (if needed)


    return { success: true, path: `/image/user/${ctx.session.user.id}.webp` };
  }),
  changeUserInfo: protectedProcedure
  .input(
    z.object({
      name: z.string().min(1).optional().nullable().or(z.literal("")),
      bio: z.string().max(100).optional().nullable(),
      email: z.string().email().optional().nullable().or(z.literal("")),
      phone: z.string().optional().nullable(),
      country: z.custom<Country>().optional().nullable(),
    })

  ).mutation(async ({ input, ctx }) => {
    const data : updateUserData = {};
    if(input.name) data.name = input.name;
    if(input.bio) data.bio = input.bio;
    if(input.email) data.email = input.email;
    if(input.phone) data.phone_number = input.phone;
    if(input.country) data.country_abbrev = input.country.country;
  
    // update user info
    const user = await ctx.db.user.update({
      where: {
        id: ctx.session.user.id, 
      },
      data: data
    });
    if(user) return { success: true };

    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
      message: "There was an error updating user info",
    });
  }),
  createNewUser: publicProcedure
    .input(
      z.object({
        email: z.object({
          email: z.string().email(),
          isValid: z.literal(true),
        }),
        name: z.object({
          name: z.string().min(1),
          isValid: z.literal(true),
        }),
        phone: z.object({
          phone: z.string().min(1),
          isValid: z.literal(true),
        }),
        country: z.custom<Country>(),
        dateOfBirth: z.object({
          dateOfBirth: z.date(),
          isValid: z.literal(true),
        }),
        investingReason: z.custom<InvestingReason>(),
        investingExperience: z.custom<InvestingExperience>(),
        referralCode: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let isReferralCodeValid = null;

      const isEmailTaken = await ctx.db.user.findFirst({
        where: {
          email: input.email.email,
        },
      });
      if (isEmailTaken) return { success: false, error: "Email already taken" };

      isReferralCodeValid = await ctx.db.referralCode.findFirst({
        where: {
          code: input.referralCode,
        },
      });

      // generate tag for user
      const tag = await generateUserTag(input.name.name);
      // generate random balance for referral code
      const initialBalace = isReferralCodeValid ? getRandomNumber(5, 15) : 0;

      const user = await ctx.db.user.create({
        data: {
          email: input.email.email,
          name: input.name.name,
          tag: tag,
          phone_number: input.phone.phone,
          phone_prefix: input.country.code,
          country_abbrev: input.country.country,
          dateOfBirth: input.dateOfBirth.dateOfBirth,
          investingReason: input.investingReason,
          investingExperience: input.investingExperience,
          balance: initialBalace,
        },
      });

      if (isReferralCodeValid) {
        // create record of referral code use
        await ctx.db.referralUse.create({
          data: {
            userId: user.id,
            referralCodeId: isReferralCodeValid.id,
          },
        });

        // add balannce to the user who referred
        await ctx.db.user.update({
          where: {
            id: isReferralCodeValid.userId,
          },
          data: {
            balance: {
              increment: 10,
            },
          },
        });
      }
    }),
  getAdditionalAccountDetails: publicProcedure.query(async ({ ctx }) => {
    const info = await ctx.db.user.findUnique({
      where: {
        id: 2, // User ID you're querying
      },
      select: {
        id: true,
        balance: true,
        createdAt: true,
        bio: true,
        followers: {
          select: {
            follower: true,
          },
          where: {
            followedId: 3, // Followed is ID 2
          },
        },
        following: {
          // Users whom the current user follows
          where: {
            followerId: 2, // Follower is ID 2
          },
          select: {
            followed: {
              select: {
                id: true,
                name: true,
                tag: true,
              },
            },
          },
        },
      },
    });
    
    
    
    
    console.log(info);
    return info;
  }),
});

async function generateUserTag(name: string, count = 0) {
  // sanitize name
  let tag = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (count > 0) {
    tag += count;
  }

  const isTaken = await context.prisma.user.findFirst({
    where: {
      tag,
    },
  });

  if (isTaken) return generateUserTag(name, count + 1);

  return tag;
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
