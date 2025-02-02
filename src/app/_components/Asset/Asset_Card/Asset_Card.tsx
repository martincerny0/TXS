"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import type { Asset } from "@/types/asset";
import { TrendingDown, TrendingUp, PlusCircle, Lock } from "lucide-react";
import AssetLogo from "../Asset_Logo/Asset_Logo";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { api } from "@/trpc/react";
import type { User } from "next-auth";

interface AssetCardProps {
  asset: Asset;
  className?: string;
  router: AppRouterInstance;
  isDisabled?: boolean;
  setIsDisabled?: (isDisabled: boolean) => void;
  user: User | undefined;
}

const AssetCard: React.FC<AssetCardProps> = ({
  asset,
  className,
  router,
  isDisabled,
  setIsDisabled = () => {return}, // prefent from function being undefined
  user
}) => {


  // mutations
  const createChartMutation = api.chart.createNewChart.useMutation();

  const createNewChart = async (assetId: number) => {
    setIsDisabled(true);

    const response = await createChartMutation.mutateAsync({
      initialAssetId: assetId,
    });
    if (response.id) {
      router.push(`/chart/${response.id}`);
    }
  };

  const [assetDailyPriceChange, setAssetDailyPriceChange] = useState<number>(0);

  return (
    <Card
      key={asset.symbol}
      className={`flex items-center space-x-4 p-2 transition-transform hover:scale-105 ${className} ${isDisabled && "opacity-70"}`}
    >
      <AssetLogo assetSymbol={asset.symbol} height={28} width={28} />
      <div className="flex-grow">
        <h4 className="font-bold">{asset.symbol}</h4>
        <p className="max-w-16 truncate text-sm text-gray-500">{asset.name}</p>
      </div>
      <div className="flex-grow">
        <p
          className={`flex text-sm font-bold text-gray-500 ${assetDailyPriceChange < 0 ? "text-red-600" : "text-green-600"}`}
        >
          {assetDailyPriceChange.toFixed(2)}{" "}
          {assetDailyPriceChange < 0 ? (
            <TrendingDown className="ml-2 h-6 w-6" />
          ) : (
            <TrendingUp className="ml-2 h-6 w-6" />
          )}
        </p>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {user ? (
              <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => createNewChart(asset.id)}
              disabled={isDisabled}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
            ) : (
              <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={true}
            >
              <Lock className="h-4 w-4" />
            </Button>
            )  
            }
          </TooltipTrigger>
          <TooltipContent>{user ? ("Open in new chart") : ("Sign in to open new chart")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Card>
  );
};

export default AssetCard;
