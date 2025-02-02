"use client";
import RealTimeClock from "@/app/_components/Others/RealTimeClock/RealTimeClock";
import { Button } from "@/components/ui/button";
import type { ChartTimeFrame, ChartCandlestick, Chart } from "@/types/chart";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { Painting, Trendline, TrendlinePoint } from "@/types/chart";

interface ChartCandlestickChartProps {
  chart: Chart;
}

const CandlestickChart: React.FC<ChartCandlestickChartProps> = ({ chart }) => {
  const [data, setData] = useState<ChartCandlestick[]>([]);

  // action states
  const [timeframe, setTimeframe] = useState<ChartTimeFrame>(
    chart.selectedTimeframe,
  );
  const [isPainting, setIsPainting] = useState<boolean>(
    chart.selectedTool === "paint",
  );
  const [isTrendline, setIsTrendline] = useState<boolean>(
    chart.selectedTool === "trendline",
  );
  const [isPanning, setIsPanning] = useState<boolean>(
    chart.selectedTool === "pan",
  );
  const [isTexting, setIsTexting] = useState<boolean>(
    chart.selectedTool === "text",
  );
  const [panOffset, setPanOffset] = useState<number>(0);

  // refs
  const chartRef = useRef<SVGSVGElement | null>(null);
  const paintLayerRef = useRef<SVGGElement | null>(null);

  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [trendlines, setTrendlines] = useState<Trendline[]>([]);
  const [trendlinePoints, setTrendlinePoints] = useState<TrendlinePoint[]>([]);
  const [trendlineStart, setTrendlineStart] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const initialData: ChartCandlestick[] = Array.from(
      { length: 200 },
      (_, i) => {
        const base = 100 + i / 3;
        return {
          date: new Date(Date.now() - i * 60000),
          open: base,
          high: base + Math.random() * 10,
          low: base - Math.random() * 10,
          close: base + (Math.random() * 10 - 5),
        };
      },
    );

    // { date: new Date("2024-11-01T00:00:00Z"), open: 100, high: 105, low: 95, close: 102 },
    // { date: new Date("2024-11-01T00:01:00Z"), open: 102, high: 106, low: 98, close: 104 },
    // { date: new Date("2024-11-01T00:02:00Z"), open: 104, high: 108, low: 100, close: 106 },
    // { date: new Date("2024-11-01T00:03:00Z"), open: 106, high: 110, low: 102, close: 108 },
    // { date: new Date("2024-11-01T00:04:00Z"), open: 108, high: 112, low: 104, close: 110 },

    // { date: new Date("2024-11-01T00:05:00Z"), open: 110, high: 114, low: 106, close: 112 },
    // { date: new Date("2024-11-01T00:06:00Z"), open: 112, high: 116, low: 108, close: 114 },
    // { date: new Date("2024-11-01T00:07:00Z"), open: 114, high: 118, low: 110, close: 116 },
    // { date: new Date("2024-11-01T00:08:00Z"), open: 116, high: 120, low: 112, close: 118 },
    // { date: new Date("2024-11-01T00:09:00Z"), open: 118, high: 122, low: 114, close: 120 },

    // { date: new Date("2024-11-01T00:10:00Z"), open: 120, high: 124, low: 116, close: 122 },
    // { date: new Date("2024-11-01T00:11:00Z"), open: 122, high: 126, low: 118, close: 124 },
    // { date: new Date("2024-11-01T00:12:00Z"), open: 124, high: 128, low: 120, close: 126 },
    // { date: new Date("2024-11-01T00:13:00Z"), open: 126, high: 130, low: 122, close: 128 },
    // { date: new Date("2024-11-01T00:14:00Z"), open: 128, high: 132, low: 124, close: 130 },

    // { date: new Date("2024-11-01T05:15:00Z"), open: 130, high: 134, low: 126, close: 132 },

    setData(initialData);
  }, []);

  const scaleY = (
    price: number,
    maxPrice: number,
    minPrice: number,
    chartHeight: number,
  ): number => {
    const priceRange = maxPrice - minPrice;
    return ((maxPrice - price) / priceRange) * (chartHeight - 20) + 10;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderChart = () => {
    if (!chartRef.current) return;

    const svg = chartRef.current;
    svg.innerHTML = "";

    const paintLayer = paintLayerRef.current;
    const chartHeight = 400;
    const candleWidth = 20;
    const spacing = 5;

    if (paintLayer) svg.appendChild(paintLayer);

    const prices = data.flatMap((d) => [d.high, d.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const chartWidth = 1500;

    svg.setAttribute("height", (chartHeight + 40).toString());

    const aggregatedData = ChangeDataByTimeframe(timeframe);

    drawGridLines(
      svg,
      aggregatedData,
      chartWidth,
      chartHeight,
      maxPrice,
      minPrice,
    );
    drawCandlesticks(
      svg,
      aggregatedData,
      candleWidth,
      spacing,
      chartHeight,
      maxPrice,
      minPrice,
    );
    renderPaintings();
    renderTrendlines(svg);
  };

  enum Timeframe {
    "1m" = 1,
    "3m" = 3,
    "5m" = 5,
    "15m" = 15,
    "1h" = 60,
    "4h" = 240,
    "1D" = 1440,
  }

  const ChangeDataByTimeframe = (
    timeframe: ChartTimeFrame,
  ): ChartCandlestick[] => {
    // get the chosen timeframe in minutes
    const timeframeInMinutes = Timeframe[timeframe];

    return data.reduce((changedData: ChartCandlestick[], _, index) => {
      if (index % timeframeInMinutes === 0) {
        // get all values within the chosen timeframe
        const chunk: ChartCandlestick[] = data.slice(
          index,
          index + timeframeInMinutes,
        );
        changedData.push({
          date: chunk[0]?.date ?? null,
          open: chunk[0]?.open ?? 0,
          high: Math.max(...chunk.map((d) => d.high)),
          low: Math.min(...chunk.map((d) => d.low)),
          close: chunk[chunk.length - 1]?.close ?? 0,
        });
      }
      return changedData;
    }, []);
  };

  const drawGridLines = (
    svg: SVGSVGElement,
    chartData: ChartCandlestick[],
    chartWidth: number,
    chartHeight: number,
    maxPrice: number,
    minPrice: number,
  ) => {
    const labelCount = 5;
    const step = (maxPrice - minPrice) / (labelCount - 1);

    // Draw horizontal grid lines and price axis
    for (let i = 0; i < labelCount; i++) {
      const price = (maxPrice - step * i).toFixed(2);
      const y = scaleY(parseFloat(price), maxPrice, minPrice, chartHeight);

      const gridLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      gridLine.setAttribute("x1", "0");
      gridLine.setAttribute("y1", y.toString());
      gridLine.setAttribute("x2", chartWidth.toString());
      gridLine.setAttribute("y2", y.toString());
      gridLine.setAttribute("class", "stroke-gray-300");
      svg.appendChild(gridLine);

      const priceLabel = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      priceLabel.setAttribute("x", "1115"); // Position to the left of the chart
      priceLabel.setAttribute("y", (y + 4).toString()); // Center-align with grid line
      priceLabel.setAttribute("class", "text-xs fill-gray-700");
      priceLabel.textContent = price;
      svg.appendChild(priceLabel);
    }

    const candleWidth = 20;
    const spacing = 5;
    const totalCandles = chartData.length;
    const frequency = 5; // Draw every 5th vertical line

    for (let i = 0; i <= totalCandles; i++) {
      if (i % frequency === 0) {
        const x = i * (candleWidth + spacing) + spacing;

        const verticalLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        verticalLine.setAttribute("x1", x.toString());
        verticalLine.setAttribute("y1", "0");
        verticalLine.setAttribute("x2", x.toString());
        verticalLine.setAttribute("y2", chartHeight.toString());
        verticalLine.setAttribute("class", "stroke-gray-300");
        svg.appendChild(verticalLine);
      }
    }
  };

  const drawCandlesticks = (
    svg: SVGSVGElement,
    chartData: ChartCandlestick[],
    candleWidth: number,
    spacing: number,
    chartHeight: number,
    maxPrice: number,
    minPrice: number,
  ) => {
    chartData.forEach((d, i) => {
      const { open, high, low, close } = d;
      const x = i * (candleWidth + spacing) + spacing + panOffset;
      const candleOpen = scaleY(open, maxPrice, minPrice, chartHeight);
      const candleClose = scaleY(close, maxPrice, minPrice, chartHeight);
      const candleHigh = scaleY(high, maxPrice, minPrice, chartHeight);
      const candleLow = scaleY(low, maxPrice, minPrice, chartHeight);

      const isBullish = close > open;

      const wick = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      wick.setAttribute("x1", (x + candleWidth / 2).toString());
      wick.setAttribute("y1", candleHigh.toString());
      wick.setAttribute("x2", (x + candleWidth / 2).toString());
      wick.setAttribute("y2", candleLow.toString());
      wick.setAttribute("class", "stroke-black");
      svg.appendChild(wick);

      const candle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      candle.setAttribute("x", x.toString());
      candle.setAttribute("y", Math.min(candleOpen, candleClose).toString());
      candle.setAttribute("width", candleWidth.toString());
      candle.setAttribute("height", Math.abs(candleClose - candleOpen).toString());
      candle.setAttribute(
        "class",
        isBullish
          ? "fill-green-500 stroke-green-700"
          : "fill-red-500 stroke-red-700",
      );
      svg.appendChild(candle);
    });
  };

  const renderPaintings = () => {
    if (!paintLayerRef.current) return;
    paintLayerRef.current.innerHTML = "";
    paintings.forEach(({ x, y }) => {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      circle.setAttribute("cx", (x + panOffset).toString());
      circle.setAttribute("cy", y.toString());
      circle.setAttribute("r", "7");
      circle.setAttribute("class", "fill-blue-500");
      paintLayerRef.current?.appendChild(circle);
    });

    trendlinePoints.forEach(({ x, y }) => {
      const point = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      point.setAttribute("cx", (x + panOffset).toString());
      point.setAttribute("cy", y.toString());
      point.setAttribute("r", "3");
      point.setAttribute("class", "fill-red-500");
      paintLayerRef.current?.appendChild(point);
    });
  };

  const renderTrendlines = (svg: SVGSVGElement) => {
    trendlines.forEach(({ start, end }) => {
      const trendline = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      trendline.setAttribute("x1", (start.x + panOffset).toString());
      trendline.setAttribute("y1", start.y.toString());
      trendline.setAttribute("x2", (end.x + panOffset).toString());
      trendline.setAttribute("y2", end.y.toString());
      trendline.setAttribute("class", "stroke-blue-500");
      trendline.setAttribute("stroke-width", "2");
      svg.appendChild(trendline);
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isPainting) {
      setIsTexting(true);
      const { offsetX, offsetY } = e.nativeEvent;
      setPaintings((prev) => [...prev, { x: offsetX - panOffset, y: offsetY }]);
    } else if (isTrendline) {
      const { offsetX, offsetY } = e.nativeEvent;
      setTrendlinePoints((prev) => [
        ...prev,
        { x: offsetX - panOffset, y: offsetY },
      ]);
      if (!trendlineStart) {
        setTrendlineStart({ x: offsetX - panOffset, y: offsetY });
      } else {
        setTrendlines((prev) => [
          ...prev,
          {
            start: trendlineStart,
            end: { x: offsetX - panOffset, y: offsetY },
          },
        ]);
        setTrendlineStart(null);
      }
    } else {
      setIsPanning(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanOffset((prev) => prev + e.movementX);
    } else if (isTexting && isPainting) {
      const { offsetX, offsetY } = e.nativeEvent;
      setPaintings((prev) => [...prev, { x: offsetX - panOffset, y: offsetY }]);
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setIsTexting(false);
  };

  // detect tool change
  useEffect(() => {
    setIsPainting(chart.selectedTool === "paint");
    setIsTrendline(chart.selectedTool === "trendline");
    setIsPanning(chart.selectedTool === "pan");
    setIsTexting(chart.selectedTool === "text");
  }, [chart.selectedTool]);

  // detect timeframe change
  useEffect(() => {
    setTimeframe(chart.selectedTimeframe);
  }, [chart.selectedTimeframe]);

  // detect tool, data, timeframe change to re-render chart
  useEffect(() => {
    renderChart();
  }, [
    data,
    timeframe,
    paintings,
    trendlines,
    trendlinePoints,
    panOffset,
    renderChart,
  ]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100">
      <div className="flex h-full w-full flex-col items-center bg-white p-6 shadow-md">
        <div
          className="w-full cursor-grab overflow-hidden rounded-lg border-gray-300"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg ref={chartRef} className="h-[400px] w-full">
            <g ref={paintLayerRef} />
          </svg>
        </div>
        <div className="flex w-full justify-center">
          <Button
            variant="default"
            className="m-2 transform rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-green-700"
          >
            <ArrowUpCircle className="mr-2 h-5 w-5" />
            BUY
          </Button>
          <Button
            variant="default"
            className="m-2 transform rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-red-700"
          >
            <ArrowDownCircle className="mr-2 h-5 w-5" />
            SELL
          </Button>
          <div className="flex w-full justify-end">
            <RealTimeClock className="mt-2 font-semibold text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandlestickChart;
