import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import type { ClosedTrade } from "@/types/trade";
import ShareEntity from "@/app/_components/Redirect/ShareEntity/ShareEntity";
import type { UserAccount } from "@/types/user";
import { Lock } from "lucide-react";

const fakeTrades = [
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
    exitPrice: 785.0,
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
  {
    id: 4,
    assetSymbol: "ETH",
    quantity: 0.5,
    entryPrice: 2000.0,
    exitPrice: 2200.0,
    profit: 100,
    loss: null,
  },
  {
    id: 5,
    assetSymbol: "DOGE",
    quantity: 1000,
    entryPrice: 0.2,
    exitPrice: 0.25,
    profit: 50,
    loss: null,
  },
  {
    id: 6,
    assetSymbol: "AAPL",
    quantity: 10,
    entryPrice: 145.0,
    exitPrice: 150.0,
    profit: 50,
    loss: null,
  },
  {
    id: 7,
    assetSymbol: "TSLA",
    quantity: 5,
    entryPrice: 700.0,
    exitPrice: 685.0,
    profit: 75,
    loss: null,
  },
];

interface FinancialSectionProps {
  user: UserAccount;
}

const FinancialSection: React.FC<FinancialSectionProps> = ({ user }) => {
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

  const finalTrades = user.isPrivate ? fakeTrades : trades;
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Financial Overview</h2>
      </div>

      <Card
        className={`relative mt-4 ${user.isPrivate ? "overflow-hidden" : ""}`}
      >
        {user.isPrivate && (
          <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-md">
            <p className="w-full text-center text-lg font-semibold text-gray-700">
              User&apos;s trades are private.
            </p>
          </div>
        )}
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
                {finalTrades.map((trade, index) => (
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
                            <ShareEntity url={`/chart/${trade.id}`} />
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
