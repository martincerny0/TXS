import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, XCircle, Check, X } from "lucide-react";
import type { OpenTrade } from "@/types/trade";
import { Input } from "@/components/ui/input";

const UserTrades: React.FC = () => {
  const [temporaryTakeProfit, setTemporaryTakeProfit] = useState<number | null>(null);
  const [temporaryStopLoss, setTemporaryStopLoss] = useState<number | null>(null);


  console.log(temporaryTakeProfit, temporaryStopLoss);
  const calculatedProfit = (trade: OpenTrade) => {
    if (trade.type === "buy") {
      return trade.quantity * (trade.currentPrice - trade.entryPrice);
    }
    return trade.quantity * (trade.entryPrice - trade.currentPrice);
  };
  const [isTradeEditingId, setTradeEditingId] = useState<number | null>(null);
  const [openTrades, setOpenTrades] = useState<OpenTrade[]>([
    {
      id: 1,
      asset: {
        id: 1,
        name: "Apple Inc",
        symbol: "AAPL",
        category: "stock",
        price: null,
      },
      type: "buy",
      quantity: 10,
      entryPrice: 150,
      currentPrice: 155,
      takeProfit: null,
      stopLoss: null,
      profit: 500,
      loss: null,
    },
    {
      id: 2,
      asset: {
        id: 2,
        name: "Tesla Inc",
        symbol: "TSLA",
        category: "stock",
        price: null,
      },
      type: "buy",
      quantity: 5,
      entryPrice: 2800,
      currentPrice: 2750,
      profit: null,
      loss: 250,
      takeProfit: 2700,
      stopLoss: 2850,
    },
  ]);
  const totalPortfolioValue = openTrades.reduce(
    (total, trade) => total + trade.quantity * trade.currentPrice,
    0,
  );

  const setTakeProfit = (id: number, value: number | null) => {
      // call api !!!!!

    setOpenTrades(
      openTrades.map((trade) =>
        trade.id === id ? { ...trade, takeProfit: value } : trade,
      ),
    );
  }

  const setStopLoss = (id: number, value: number | null) => {
    // call api !!!!!

    setOpenTrades(
      openTrades.map((trade) =>
        trade.id === id ? { ...trade, stopLoss: value } : trade,
      ),
    );
  }

  const closeTrade = (id: number) => {
    // call api !!!
    return null;
  }



  return (
    <div className="border-t border-gray-200 bg-white p-4 px-20 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Open Trades</h2>
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Portfolio Value</p>
          <p className="text-2xl font-bold">
            ${totalPortfolioValue.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Entry Price</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Take Profit</TableHead>
              <TableHead>Stop Loss</TableHead>
              <TableHead>Profit/Loss</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {openTrades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell className="font-medium">
                  {trade.asset.name}
                </TableCell>
                <TableCell
                  className={
                    trade.type === "buy" ? "text-green-600" : "text-red-600"
                  }
                >
                  {trade.type.toUpperCase()}
                </TableCell>
                <TableCell>{trade.quantity}</TableCell>
                <TableCell>${trade.entryPrice.toFixed(2)}</TableCell>
                <TableCell>${trade.currentPrice.toFixed(2)}</TableCell>
                {isTradeEditingId === trade.id ? (
                  <>
                    <TableCell>
                      <div  className="flex">
                    <Button variant="default" className="rounded-tr-none rounded-br-none" onClick={() => setTemporaryTakeProfit((temporaryTakeProfit ?? 0) + 1)}>
                        +
                      </Button>
                      <Input type="number" className="w-1/4 text-center rounded-none" onChange={(e) => setTemporaryTakeProfit(parseInt(e.target.value))} value={temporaryTakeProfit ?? 0} />
                      <Button variant="default" className="rounded-tl-none rounded-bl-none" disabled={(temporaryTakeProfit?? 0) <= 0} onClick={() => setTemporaryTakeProfit((temporaryTakeProfit ?? 0) - 1)}>
                        -
                      </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                      <Button variant="default"  className="rounded-tr-none rounded-br-none" onClick={() => setTemporaryStopLoss((temporaryStopLoss ?? 0) + 1)}>
                        +
                      </Button>
                      <Input className="w-1/4 text-center rounded-none" type="number"  onChange={(e) => setTemporaryStopLoss(parseInt(e.target.value))} value={temporaryStopLoss ?? 0} />
                      <Button variant="default" className="rounded-tl-none rounded-bl-none" disabled={(temporaryStopLoss?? 0) <= 0} onClick={() => setTemporaryStopLoss((temporaryStopLoss ?? 0) - 1)}>
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

                <TableCell
                  className={trade.profit ? "text-green-600" : "text-red-600"}
                >
                  ${calculatedProfit(trade).toFixed(2)}
                  {calculatedProfit(trade) > 0 ? " (+)" : " (-)"}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {isTradeEditingId === trade.id ? (<>
                      <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {setTradeEditingId(null); setTakeProfit(trade.id, temporaryTakeProfit); }}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>  {setTradeEditingId(null); setStopLoss(trade.id, temporaryStopLoss)}}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    </>) : (<>
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
                   </> )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default UserTrades;
