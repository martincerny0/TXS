import type { TradeAsset } from "@/types/asset";

export type TradeType = "Buy" | "Sell";

export interface OpenTrade {
  id: number;
  asset: TradeAsset;
  type: TradeType;
  quantity: number;
  takeProfit: number | null;
  stopLoss: number | null;
  profit: number | null;
  loss: number | null;
};

export interface ClosedTrade {
  id: number;
  assetSymbol: string;
  quantity: number;
  entryPrice: number;
  exitPrice: number;
  profit: number | null;
  loss: number | null;
}

