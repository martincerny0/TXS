import type { Asset } from "./asset";

export type ChartTool = "cursor" | "text" | "draw" | "zoom" | "move" | "trendline";
export type ChartTimeFrame = "1m" | "5m" | "15m" | "30m" | "1h" | "4h" | "1D" | "1W" | "1M" | "3M" | "1Y";

export interface ChartText {
    text: string;
    fontSize: number;
    coordinates: {
        x: number;
        y: number;
    };
} 
export interface ChartPainting {
    x: number;
    y: number;
    color: string;
    size: number;
}
export interface ChartTrendline {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: string;
    size: number;
}

export interface Chart {
    id: number;
    paintings: ChartPainting[];
    trendlines: ChartTrendline[];
    texts: ChartText[];
    selectedTimeframe: ChartTimeFrame ;
    selectedTool: ChartTool;
    zoomArea: {
        x1: number | null;
        y1: number | null;
    };
    isTakeProfitVisible: boolean;
    isStopLossVisible: boolean;
    asset: Asset;
    order: {
        value: number;
        quantity: number;
        type: "buy" | "sell";  
        takeProfit: number;
        stopLoss: number;
    };
}

