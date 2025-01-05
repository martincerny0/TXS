import type { Asset } from "@/types/asset";

export type TradeType = "buy" | "sell";

export interface OpenTrade {
  id: number;
  asset: Asset;
  type: TradeType;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
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

