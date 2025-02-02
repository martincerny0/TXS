import React, { useState } from "react";
import OpenTradesTable from "@/app/_components/Trade/OpenTradesTable";

const UserTrades: React.FC = () => {
  const [totalPortfolioValue, setTotalPortfolioValue] = useState<number>(0);

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
        <OpenTradesTable
          setTotalPortfolioValue={setTotalPortfolioValue}
          userId={2}
        />
      </div>
    </div>
  );
};
export default UserTrades;
