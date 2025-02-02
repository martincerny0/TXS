
export type AssetCategory = "Crypto" | "Stock" | "ETF";
export type AssetType = "Buy" | "Sell";

export interface Asset {
    id: number;
    name: string;
    symbol: string;
    category: AssetCategory;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TradeAsset extends Asset {
    currentPrice: number;
    entryPrice: number;
}

export interface StaticAsset extends Asset {
    priceAtStartOfDay: number;
    price: number;
}