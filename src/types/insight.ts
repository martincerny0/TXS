import type { InsightsCategory, InsightsTag } from "@prisma/client";

export interface InsightShort {
    id: number;
    title: string;
    description: string;
    isPremium: boolean;
    createdAt: Date;
}
export interface Insight {
    id: number;
    title: string;
    description: string;
    category: InsightsCategory;
    readTime: number;
    isPremium: boolean;
    tag: InsightsTag;
    createdAt: Date;
    rating: number;
  }