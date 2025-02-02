"use client";
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Chart } from '@/types/chart';
import AssetLogo from '../../Asset/Asset_Logo/Asset_Logo';
import { Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { api } from '@/trpc/react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';


interface ChartCardProps {
    chart: Chart;
    className?: string;
    router: AppRouterInstance;
    isDisabled: boolean;
    setIsDisabled: (isDisabled: boolean) => void;
}
const ChartCard : React.FC<ChartCardProps> = ({chart, className, router, isDisabled, setIsDisabled: setIsDisabled }) => {
    const utils = api.useUtils();

    // mutation
    const removeChartMutation = api.chart.removeChart.useMutation();
    

    const removeChart = async (id: number, e : React.MouseEvent) => {
        setIsDisabled(true);
        e.stopPropagation();
        
        const response = await removeChartMutation.mutateAsync({chartId: id});
        if(response) {
            // remove the chart also from the frontend
            await utils.chart.invalidate();
        }
        setIsDisabled(false);
    }
    return (
        <Card
        className={`w-1/6 cursor-pointer hover:border-slate-50 hover:bg-slate-50 ${isDisabled && "opacity-70"}`} 
        onClick={isDisabled ? undefined : () => {
          router.push(`/chart/${chart.id}`); 
          setIsDisabled(true);}}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex h-10 w-10 items-center space-x-2">
            <AssetLogo assetSymbol={chart.asset.symbol} height={40} width={40} />
            <div>
              <p className="text-sm font-semibold">
                {chart.asset.symbol}
              </p>
              <p className="w-20 truncate text-xs text-muted-foreground">
                {chart.asset.name}
              </p>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={isDisabled}
                  onClick={(e) => removeChart(chart.id, e)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove chart</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent>
          <p className="mt-1 text-xs text-muted-foreground">
            Created: {chart.createdAt?.toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    )
}

export default ChartCard;