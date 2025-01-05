
export type AssetCategory = "crypto" | "stock" | "ETF";
export type AssetType = "buy" | "sell";

export interface Asset {
    id: number;
    name: string;
    price?: number | null;
    symbol: string;
    category: AssetCategory;
}