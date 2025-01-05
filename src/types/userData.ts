import type { InvestingReason, InvestingExperience } from "@prisma/client";
import type Country from "../types/country";

export default interface UserData {
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