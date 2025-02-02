"use client";

import React, { useEffect, useState, useCallback, use } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Send } from "lucide-react";
import Link from "next/link";
import type { Chart, ChartTool } from "@/types/chart";
import ToolSidebar from "./ToolSidebar";
import ActionBar from "./ActionBar";
import RelatedSidebar from "./RelatedSidebar";
import dynamic from "next/dynamic";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";
import AssetLogo from "@/app/_components/Asset/Asset_Logo/Asset_Logo";
import { useRouter } from "next/navigation";
import MainLoading from "@/app/_components/Loading/MainLoading";
import UserAvatar from "@/app/_components/MainElements/User_Avatar/User_Avatar";
import type { User } from "next-auth";
import CandlestickChart from "./Chart";

const UserTrades = dynamic(() => import("./UserTrades"));
const OtherAssets = dynamic(() => import("./OtherAssets"));

interface ChartPageProps {
  initialChartId: number;
  user: User;
}

const ChartPage: React.FC<ChartPageProps> = ({ initialChartId, user }) => {
  const { toast } = useToast();
  const router = useRouter();

  const [charts, setCharts] = useState<Chart[]>([]);
  const [selectedChart, setSelectedChart] = useState<Chart>();
  const [changedAssetId, setChangedAssetId] = useState<number>(0);

  // select chart by the route id or on the chart switch
  const selectChartById = useCallback(
    (id: string) => {
      setSelectedChart(charts.find((chart) => chart.id.toString() === id));
      window.history.pushState({}, "", `/chart/${id}`);
    },
    [charts],
  );

  // fetching data
  const {
    data: chartsData,
    isLoading,
    refetch,
  } = api.chart.getUserCharts.useQuery();
  const {
    data: changedAsset,
    isLoading: isAssetLoading,
    refetch: refetchAsset,
  } = api.asset.getAssetById.useQuery(
    { assetId: changedAssetId },
    { enabled: false },
  );
  // mutation
  const removeChartMutation = api.chart.removeChart.useMutation();

  useEffect(() => {
    if (chartsData) {
      setCharts(chartsData);
      setSelectedChart(chartsData.find((chart) => chart.id === initialChartId));
    }
  }, [chartsData, initialChartId]);

  useEffect(() => {
    // refetch when the selected chart is undefined
    if (selectedChart === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetch();
    }
  }, [selectedChart, refetch]);

  // when changedId changes, fetch new asset
  useEffect(() => {
    if (changedAssetId !== 0) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refetchAsset();
    }
  }, [changedAssetId, refetchAsset]);

  useEffect(() => {
    if (changedAsset && selectedChart) {
      setSelectedChart((prevChart) =>
        prevChart
          ? {
              ...prevChart,
              asset: {
                id: changedAsset.id,
                symbol: changedAsset.symbol,
                name: changedAsset.name,
                category: changedAsset.category,
              },
            }
          : undefined,
      );
      // change chart in the usestate
      setCharts((prevCharts) =>
        prevCharts.map((chart) =>
          chart.id === selectedChart.id
            ? {
                ...chart,
                asset: {
                  id: changedAsset.id,
                  symbol: changedAsset.symbol,
                  name: changedAsset.name,
                  category: changedAsset.category,
                },
              }
            : chart,
        ),
      );
      // change the chart in db.
    }
  }, [changedAsset]);

  if (isLoading || !selectedChart || !charts) {
    return <MainLoading />;
  }

  const updateCurrentTool = (tool: ChartTool) => {
    setSelectedChart({ ...selectedChart, selectedTool: tool });
  };

  const addNewChart = () => {
    const newChart: Chart = {
      id: charts.length + 1,
      asset: {
        id: 1,
        symbol: "NEW",
        name: "new chart.",
        category: "Stock",
      },
      selectedTimeframe: "1m",
      selectedTool: "cursor",
      zoomArea: { x1: null, y1: null },
      paintings: [],
      trendlines: [],
      texts: [],
      isTakeProfitVisible: false,
      isStopLossVisible: false,
      order: {
        value: 0,
        quantity: 0,
        type: "buy",
        takeProfit: 0,
        stopLoss: 0,
      },
    };
    setCharts([...charts, newChart]);
  };

  const removeChart = async (chartId: number) => {
    // remove the chart from the state
    setCharts(charts.filter((chart) => chart.id !== chartId));
    const response = await removeChartMutation.mutateAsync({ chartId });

    if (response.success) {
      // change url
      router.replace(`/chart/${charts[charts.length - 2]?.id ?? ""}`);
    }
    toast({
      title: "Chart removed",
      description: "Chart was successfully removed.",
      variant: "default",
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "r":
        updateCurrentTool("cursor");
        break;
      case "t":
        updateCurrentTool("text");
        break;
      case "p":
        updateCurrentTool("paint");
        break;
      case "l":
        updateCurrentTool("trendline");
        break;
    }
  };

  return (
    <div
      className={`container mx-auto flex flex-col bg-gray-100 dark:bg-gray-400`}
      onKeyDown={handleKeyDown}
    >
      <div className="flex flex-1">
        {/* Left sidebar for tools */}
        <ToolSidebar
          updateCurrentTool={updateCurrentTool}
          selectedTool={selectedChart.selectedTool}
        />

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Tabs
            value={selectedChart.id.toString()}
            onValueChange={selectChartById}
            className="flex flex-1 flex-col"
          >
            <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center">
                <TabsList className="h-10 bg-transparent">
                  {charts.map((chart) => (
                    <TabsTrigger
                      key={chart.id}
                      value={chart.id.toString()}
                      className="relative m-2 border"
                    >
                      <AssetLogo
                        assetSymbol={chart.asset.symbol}
                        width={20}
                        height={20}
                      />
                      <p className="ml-2">{chart.asset.symbol}</p>
                      {charts.length > 1 && (
                        <Button
                          variant="link"
                          onClick={async () => {
                            await removeChart(chart.id);
                          }}
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <Button
                  variant="ghost"
                  onClick={addNewChart}
                  className="h-8 w-8 text-center"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/chat">
                          <Send className="h-5 w-5" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Direct Message</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <UserAvatar user={user} isDropdown={true} />
              </div>
            </div>

            <TabsContent
              key={selectedChart.id}
              value={selectedChart.id.toString()}
              className="m-0 flex flex-1 overflow-hidden p-0"
            >
              <div className="flex flex-1 flex-col overflow-hidden">
                <ActionBar
                  key={selectedChart.id}
                  selectedChart={selectedChart}
                  setSelectedChart={setSelectedChart}
                  changeSelectedAsset={setChangedAssetId}
                />
                {/* chart place!!!! */}
                <CandlestickChart chart={selectedChart} />
                {/* chart place!!!! */}
              </div>

              {/* Right sidebar */}
              <RelatedSidebar />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Opened trades  */}
      <UserTrades />

      {/* Other assets */}
      {/* {console.log(selectedChart.asset.category)} */}
      <OtherAssets
      user={user}
        assetCategory={selectedChart.asset.category}
        AssetId={selectedChart.asset.id}
      />
    </div>
  );
};

export default ChartPage;
