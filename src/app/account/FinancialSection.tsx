import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Wallet, Activity, HandCoins, Landmark, PieChartIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function FinancialSection() {
    const [isYearlyReturn, setIsYearlyReturn] = useState(false)

    const monthlyReturn = 5.2
    const yearlyReturn = 18.7

     // testing trades 
  const trades = [
    {
      asset: "AAPL",
      quantity: 10,
      openPrice: 145.0,
      closePrice: 150.0,
      profitLoss: 50,
    },
    {
      asset: "TSLA",
      quantity: 5,
      openPrice: 700.0,
      closePrice: 685.0,
      profitLoss: -75,
    },
    {
      asset: "BTC",
      quantity: 0.1,
      openPrice: 30000.0,
      closePrice: 33000.0,
      profitLoss: 300,
    },
    {
      asset: "ETH",
      quantity: 2,
      openPrice: 2000.0,
      closePrice: 1975.0,
      profitLoss: -50,
    },
    {
      asset: "GOOGL",
      quantity: 3,
      openPrice: 2400.0,
      closePrice: 2466.67,
      profitLoss: 200,
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
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-2xl font-bold">$12584.58</div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <HandCoins className="mr-1 h-4 w-4" /> Withdraw
                </Button>
                <Button variant="default" size="sm" className="flex-1">
                  <Landmark className="mr-1 h-4 w-4" /> Deposit
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isYearlyReturn ? "Yearly" : "Monthly"} Return
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div
                  className={`mb-2 text-4xl font-bold ${(isYearlyReturn ? yearlyReturn : monthlyReturn) >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {(isYearlyReturn ? yearlyReturn : monthlyReturn) >= 0
                    ? "+"
                    : "-"}
                  {Math.abs(
                    isYearlyReturn ? yearlyReturn : monthlyReturn,
                  ).toFixed(1)}
                  %
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="return-toggle" className="text-sm">
                    Monthly
                  </Label>
                  <Switch
                    id="return-toggle"
                    checked={isYearlyReturn}
                    onCheckedChange={setIsYearlyReturn}
                  />
                  <Label htmlFor="return-toggle" className="text-sm">
                    Yearly
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-2 font-medium">{trade.asset}</td>
                      <td className="py-2">{trade.quantity}</td>
                      <td className="py-2">${trade.openPrice.toFixed(2)}</td>
                      <td className="py-2">${trade.closePrice.toFixed(2)}</td>
                      <td className="flex items-center py-2">
                        <span
                          className={
                            trade.profitLoss > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          ${Math.abs(trade.profitLoss)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    );};