"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Wallet,
  Activity,
  HandCoins,
  Landmark,
  PieChartIcon,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import type { ClosedTrade } from "@/types/trade";

const FinancialSection: React.FC = () => {

  const router = useRouter();


  // testing trades
  const trades: ClosedTrade[] = [
    {
      id: 1,
      assetSymbol: "AAPL",
      quantity: 10,
      entryPrice: 145.0,
      exitPrice: 150.0,
      profit: 50,
      loss: null,
    },
    {
      id: 2,
      assetSymbol: "TSLA",
      quantity: 5,
      entryPrice: 700.0,
      exitPrice: 685.0,
      profit: 75,
      loss: null,
    },
    {
      id: 3,
      assetSymbol: "BTC",
      quantity: 0.1,
      entryPrice: 30000.0,
      exitPrice: 33000.0,
      profit: null,
      loss: 300,
    },
  ];

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Financial Overview</h2>
        <Link href="/financial-details">
          <Button variant="outline" size="sm">
            <PieChartIcon className="mr-2 h-4 w-4" />
            Open Portfolio
          </Button>
        </Link>
      </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-2xl font-bold">$12584.58</div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <HandCoins className="mr-1 h-4 w-4" /> Withdraw
              </Button>
              <Button variant="default" size="sm" className="w-1/4">
                <Landmark className="mr-1 h-4 w-4" /> Deposit
              </Button>
            </div>
          </CardContent>
        </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase text-gray-600">
                  <th className="pb-2">Asset</th>
                  <th className="pb-2">Qty</th>
                  <th className="pb-2">Open</th>
                  <th className="pb-2">Close</th>
                  <th className="pb-2">P/L</th>
                  <th className="pb-2"></th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-2 font-medium">{trade.assetSymbol}</td>
                    <td className="py-2">{trade.quantity}</td>
                    <td className="py-2">${trade.entryPrice.toFixed(2)}</td>
                    <td className="py-2">${trade.exitPrice.toFixed(2)}</td>
                    <td className="flex items-center py-2">
                      <span
                        className={
                          trade.profit ? "text-green-500" : "text-red-500"
                        }
                      >
                        {trade.loss && "-"}$
                        {(trade.profit ?? trade.loss!).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Send
                              className={`ml-5 h-4 w-4`}
                              onClick={() =>
                                router.push(
                                  `/feed?newPost=true&tradeId=${trade.id}&insightId=`,
                                )
                              }
                            />
                          </TooltipTrigger>
                          <TooltipContent side="top" align="center">
                            Share in post
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default FinancialSection;
