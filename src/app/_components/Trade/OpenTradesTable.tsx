import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OpenTrade } from "@/types/trade";
import OpenTradeRow from "@/app/_components/Trade/OpenTradeRow";
import { api } from "@/trpc/react";
import OpenTradeRowSkeleton from "./OpenTradeRowSkeleton";

interface OpenTradesTableProps {
  setTotalPortfolioValue: (value: number) => void;
  userId: number;
}

const OpenTradesTable: React.FC<OpenTradesTableProps> = ({
  setTotalPortfolioValue,
  userId,
}) => {
  const [openTrades, setOpenTrades] = useState<OpenTrade[]>([]);

  const [temporaryTakeProfit, setTemporaryTakeProfit] = useState<number | null>(
    null,
  );
  const [temporaryStopLoss, setTemporaryStopLoss] = useState<number | null>(
    null,
  );

  const [isTradeEditingId, setTradeEditingId] = useState<number | null>(null);

  const { data: setOpenTradesData, isLoading } =
    api.trade.getUserOpenTrades.useQuery({ userId: userId });

  useEffect(() => {
    if (setOpenTradesData) {
      setOpenTrades(setOpenTradesData);
      setTotalPortfolioValue(0);
    }
  }, [setOpenTradesData, setTotalPortfolioValue]);

  return (
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
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <OpenTradeRowSkeleton key={index} />
          ))}
        {openTrades.length !== 0 && !isLoading
          ? openTrades.map((trade) => (
              <OpenTradeRow
                key={trade.id}
                trade={trade}
                temporaryTakeProfit={temporaryTakeProfit}
                setTemporaryTakeProfit={setTemporaryTakeProfit}
                temporaryStopLoss={temporaryStopLoss}
                setTemporaryStopLoss={setTemporaryStopLoss}
                isTradeEditingId={isTradeEditingId}
                setTradeEditingId={setTradeEditingId}
                openTrades={openTrades}
                setOpenTrades={setOpenTrades}
              />
            ))
          : !isLoading && (
            <TableRow>
              <TableCell
                colSpan={9}
                className="pt-5 text-center text-muted-foreground"
              >
                No open trades found
              </TableCell>
              </TableRow>
            )}
      </TableBody>
    </Table>
  );
};

export default OpenTradesTable;
