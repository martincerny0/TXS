import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, XCircle, Check, X } from "lucide-react";
import type { OpenTrade } from "@/types/trade";

interface OpenTradeRowProps {
  trade: OpenTrade;
  setTemporaryTakeProfit: (takeProfit: number) => void;
  temporaryTakeProfit: number | null;
  setTemporaryStopLoss: (stopLoss: number) => void;
  temporaryStopLoss: number | null;
  setTradeEditingId: (id: number | null) => void;
  isTradeEditingId: number | null;
  setOpenTrades: (openTrades: OpenTrade[]) => void;
  openTrades: OpenTrade[];
}

const OpenTradeRow: React.FC<OpenTradeRowProps> = ({
  trade,
  setTemporaryTakeProfit,
  temporaryTakeProfit,
  setTemporaryStopLoss,
  temporaryStopLoss,
  setTradeEditingId,
  isTradeEditingId,
  setOpenTrades,
  openTrades,
}) => {
  const calculatedProfit = (trade: OpenTrade) => {
    if (trade.type === "Buy") {
      return trade.quantity * (trade.asset.currentPrice - trade.asset.entryPrice);
    }
    return trade.quantity * (trade.asset.entryPrice - trade.asset.currentPrice);
  };

  const setTakeProfit = (id: number, value: number | null) => {
    // call api !!!!!

    setOpenTrades(
      openTrades.map((trade) =>
        trade.id === id ? { ...trade, takeProfit: value } : trade,
      ),
    );
  };

  const setStopLoss = (id: number, value: number | null) => {
    // call api !!!!!

    setOpenTrades(
      openTrades.map((trade) =>
        trade.id === id ? { ...trade, stopLoss: value } : trade,
      ),
    );
  };

  const closeTrade = (id: number) => {
    setOpenTrades(openTrades.filter((trade) => trade.id !== id));
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{trade.asset.name}</TableCell>
      <TableCell
        className={trade.type === "Buy" ? "text-green-600" : "text-red-600"}
      >
        {trade.type.toUpperCase()}
      </TableCell>
      <TableCell>{trade.quantity}</TableCell>
      <TableCell>${trade.asset.entryPrice.toFixed(2)}</TableCell>
      <TableCell>${trade.asset.currentPrice.toFixed(2)}</TableCell>
      {isTradeEditingId === trade.id ? (
        <>
          <TableCell>
            <div className="flex">
              <Button
                variant="default"
                className="rounded-br-none rounded-tr-none"
                onClick={() =>
                  setTemporaryTakeProfit((temporaryTakeProfit ?? 0) + 1)
                }
              >
                +
              </Button>
              <Input
                type="number"
                className="w-1/4 rounded-none text-center"
                onChange={(e) =>
                  setTemporaryTakeProfit(parseInt(e.target.value))
                }
                value={temporaryTakeProfit ?? 0}
              />
              <Button
                variant="default"
                className="rounded-bl-none rounded-tl-none"
                disabled={(temporaryTakeProfit ?? 0) <= 0}
                onClick={() =>
                  setTemporaryTakeProfit((temporaryTakeProfit ?? 0) - 1)
                }
              >
                -
              </Button>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex">
              <Button
                variant="default"
                className="rounded-br-none rounded-tr-none"
                onClick={() =>
                  setTemporaryStopLoss((temporaryStopLoss ?? 0) + 1)
                }
              >
                +
              </Button>
              <Input
                className="w-1/4 rounded-none text-center"
                type="number"
                onChange={(e) => setTemporaryStopLoss(parseInt(e.target.value))}
                value={temporaryStopLoss ?? 0}
              />
              <Button
                variant="default"
                className="rounded-bl-none rounded-tl-none"
                disabled={(temporaryStopLoss ?? 0) <= 0}
                onClick={() =>
                  setTemporaryStopLoss((temporaryStopLoss ?? 0) - 1)
                }
              >
                -
              </Button>
            </div>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>{trade.takeProfit?.toFixed(2) ?? "-"}</TableCell>
          <TableCell>{trade.stopLoss?.toFixed(2) ?? "-"}</TableCell>
        </>
      )}

      <TableCell className={trade.profit ? "text-green-600" : "text-red-600"}>
        ${calculatedProfit(trade).toFixed(2)}
        {calculatedProfit(trade) > 0 ? " (+)" : " (-)"}
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          {isTradeEditingId === trade.id ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTradeEditingId(null);
                  setTakeProfit(trade.id, temporaryTakeProfit);
                  setStopLoss(trade.id, temporaryStopLoss);
                }}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTradeEditingId(null);
                  setTemporaryTakeProfit(trade.takeProfit?? 0);
                  setTemporaryStopLoss(trade.stopLoss?? 0);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTradeEditingId(trade.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => closeTrade(trade.id)}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OpenTradeRow;