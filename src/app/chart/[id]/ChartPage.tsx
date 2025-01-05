"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Chart, ChartTool } from "@/types/chart";
import ToolSidebar from "./ToolSidebar";
import ActionBar from "./ActionBar";
import RelatedSidebar from "./RelatedSidebar";
import dynamic from "next/dynamic";

const UserTrades = dynamic(() => import("./UserTrades"));
const OtherAssets = dynamic(() => import("./OtherAssets"));

export default function ChartPage() {
  const createNewChart: () => Chart = () => {
    return {
      id: 1,
      asset: {
        id: 1,
        symbol: "AAPL",
        name: "Apple Inc.",
        category: "stock",
      },
      selectedTimeframe: "1M",
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
  };
  const [charts, setCharts] = useState<Chart[]>([
    {
      id: 1,
      asset: {
        id: 1,
        symbol: "AAPL",
        name: "Apple Inc.",
        category: "stock",
      },
      selectedTimeframe: "1M",
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
    },
  ]);
  const [selectedChart, setSelectedChart] = useState<Chart>(
    charts[0] ?? createNewChart(),
  );
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
        category: "stock",
      },
      selectedTimeframe: "1M",
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

  const removeChart = (chartId: number) => {
    // call api !!!!!
    setCharts(charts.filter((chart) => chart.id !== chartId));
  };
  const selectChartById = (id: string) => {
    setSelectedChart(charts.find((chart) => chart.id.toString() === id)!);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-1">
        {/* Left sidebar for tools */}
        <ToolSidebar
          updateCurrentTool={updateCurrentTool}
          selectedTool={selectedChart.selectedTool}
        />
        {/* left sidebar mam, top skoro (prihhlasen nebo ne, redirect to messages), pod top taky skor, udelat pravou stranu potom mozna pod.... */}

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
                      {chart.asset.name}
                      {charts.length > 1 && (
                        <Button
                          variant="link"
                          onClick={() => {
                            removeChart(chart.id);
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
                  size="sm"
                  onClick={addNewChart}
                  className="ml-2"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/messages">
                          <MessageSquare className="h-5 w-5" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Direct Message</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                        asChild
                      >
                        <Link href="/account">
                          <Image
                            src="/placeholder-user.jpg"
                            width="32"
                            height="32"
                            className="rounded-full"
                            alt="User Avatar"
                          />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>User Account</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
                />
                {/* chart place!!!! */}





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
      <OtherAssets />
    </div>
  );
}
