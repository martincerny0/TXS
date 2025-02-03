import type { InvestingReason, InvestingExperience } from "@prisma/client";
import type { Country } from "./country";
import type { User } from "next-auth";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server/api/root";

export interface AccountFollower {
    name: string;
    tag: string;
}

export interface AccountUser extends User {
    createdAt: Date;
    balance: number;
    followers?: AccountFollower[];
    following?: AccountFollower[];
}

export interface UserData {
    email: {
        email: string;
        isValid: boolean;
    }
    name: {
        name: string;
        isValid: boolean;
    }
    phone: {
        phone: string;
        isValid: boolean;
    }
    country: Country;
    dateOfBirth: {
        dateOfBirth: Date | null;
        isValid: boolean | null;
    };
    investingReason: InvestingReason;
    investingExperience: InvestingExperience;
  }

export interface updateUserData {
    name?: string;
    bio?: string;
    email?: string;
    phone_number?: string;
    phone_prefix?: string;
    country_abbrev?: string;
}

export type UserAccount = NonNullable<inferRouterOutputs<AppRouter>["user"]["getUserById"]>;
