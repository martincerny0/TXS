// "use client";
// import React, { useEffect, useRef, useState } from 'react';

import CandlestickBackground from "../_components/Background/Candlestick_Background/Candlestick_Background";
import BackgroundIcons from "../_components/Background/Icons_Background/Icons_Background";
import InsightCard from "../_components/Insight/Insight_Card/Insight_Card";

// interface DataPoint {
//   date: string;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
// }

// const CandlestickChart: React.FC = () => {
//   const [data, setData] = useState<DataPoint[]>([]);
//   const [timeframe, setTimeframe] = useState<number>(1); // State for timeframe
//   const [panOffset, setPanOffset] = useState<number>(0); // State for panning
//   const [isPanning, setIsPanning] = useState<boolean>(false); // State to track panning
//   const chartRef = useRef<SVGSVGElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const panStartRef = useRef<number>(0);

//   useEffect(() => {
//     const initialData: DataPoint[] = Array.from({ length: 200 }, (_, i) => {
//       const base = 100 + i;
//       return {
//         date: `2024-11-${15 + (i % 30)}`,
//         open: base,
//         high: base + Math.random() * 10,
//         low: base - Math.random() * 10,
//         close: base + (Math.random() * 10 - 5),
//       };
//     });
//     setData(initialData);
//   }, []);

//   const scaleY = (price: number, maxPrice: number, minPrice: number, chartHeight: number): number => {
//     const priceRange = maxPrice - minPrice;
//     return ((maxPrice - price) / priceRange) * (chartHeight - 20) + 10;
//   };

//   const aggregateDataByTimeframe = (data: DataPoint[], timeframe: number): DataPoint[] => {
//     if (timeframe === 1) return data;
//     const aggregated: DataPoint[] = [];
//     for (let i = 0; i < data.length; i += timeframe) {
//       const chunk = data.slice(i, i + timeframe);
//       const date = chunk[0].date;
//       const open = chunk[0].open;
//       const high = Math.max(...chunk.map((d) => d.high));
//       const low = Math.min(...chunk.map((d) => d.low));
//       const close = chunk[chunk.length - 1].close;
//       aggregated.push({ date, open, high, low, close });
//     }
//     return aggregated;
//   };

//   const renderChart = () => {
//     if (!chartRef.current) return;

//     const svg = chartRef.current;
//     const chartHeight = 400;
//     const candleWidth = 20;
//     const spacing = 5;

//     svg.innerHTML = '';

//     const aggregatedData = aggregateDataByTimeframe(data, timeframe);
//     const prices = aggregatedData.flatMap((d) => [d.high, d.low]);
//     const minPrice = Math.min(...prices);
//     const maxPrice = Math.max(...prices);
//     const chartWidth = aggregatedData.length * (candleWidth + spacing) + spacing;

//     svg.setAttribute('width', chartWidth.toString());
//     svg.setAttribute('height', (chartHeight + 40).toString());

//     drawGridLines(svg, chartWidth, chartHeight, maxPrice, minPrice, candleWidth, spacing);
//     drawCandlesticks(svg, aggregatedData, chartWidth, chartHeight, candleWidth, spacing, maxPrice, minPrice);
//     drawAxes(svg, chartWidth, chartHeight, maxPrice, minPrice);
//   };

//   const drawGridLines = (
//     svg: SVGSVGElement,
//     chartWidth: number,
//     chartHeight: number,
//     maxPrice: number,
//     minPrice: number,
//     candleWidth: number,
//     spacing: number
//   ) => {
//     const labelCount = 5;
//     const step = (maxPrice - minPrice) / (labelCount - 1);

//     for (let i = 0; i < labelCount; i++) {
//       const price = (maxPrice - step * i).toFixed(2);
//       const y = scaleY(parseFloat(price), maxPrice, minPrice, chartHeight);

//       const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//       gridLine.setAttribute('x1', '0');
//       gridLine.setAttribute('y1', y.toString());
//       gridLine.setAttribute('x2', chartWidth.toString());
//       gridLine.setAttribute('y2', y.toString());
//       gridLine.setAttribute('class', 'stroke-gray-300');
//       svg.appendChild(gridLine);

//       const priceLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
//       priceLabel.setAttribute('x', (chartWidth - 5).toString());
//       priceLabel.setAttribute('y', (y - 5).toString());
//       priceLabel.setAttribute('class', 'text-xs fill-gray-700');
//       priceLabel.textContent = price;
//       svg.appendChild(priceLabel);
//     }

//     const verticalGridCount = Math.min(10, data.length);
//     for (let i = 0; i < verticalGridCount; i++) {
//       const x = i * (chartWidth / verticalGridCount) + panOffset;
//       const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//       gridLine.setAttribute('x1', x.toString());
//       gridLine.setAttribute('y1', '0');
//       gridLine.setAttribute('x2', x.toString());
//       gridLine.setAttribute('y2', chartHeight.toString());
//       gridLine.setAttribute('class', 'stroke-gray-300');
//       svg.appendChild(gridLine);

//       const timeLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
//       timeLabel.setAttribute('x', x.toString());
//       timeLabel.setAttribute('y', (chartHeight + 20).toString());
//       timeLabel.setAttribute('class', 'text-xs fill-gray-700');
//       timeLabel.setAttribute('text-anchor', 'middle');
//       const index = Math.floor((i * data.length) / verticalGridCount);
//       timeLabel.textContent = data[index]?.date || '';
//       svg.appendChild(timeLabel);
//     }
//   };

//   const drawCandlesticks = (
//     svg: SVGSVGElement,
//     chartData: DataPoint[],
//     chartWidth: number,
//     chartHeight: number,
//     candleWidth: number,
//     spacing: number,
//     maxPrice: number,
//     minPrice: number
//   ) => {
//     chartData.forEach((d, i) => {
//       const { open, high, low, close } = d;
//       const x = i * (candleWidth + spacing) + spacing + panOffset;
//       const yOpen = scaleY(open, maxPrice, minPrice, chartHeight);
//       const yClose = scaleY(close, maxPrice, minPrice, chartHeight);
//       const yHigh = scaleY(high, maxPrice, minPrice, chartHeight);
//       const yLow = scaleY(low, maxPrice, minPrice, chartHeight);

//       const isBullish = close > open;

//       const wick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//       wick.setAttribute('x1', (x + candleWidth / 2).toString());
//       wick.setAttribute('y1', yHigh.toString());
//       wick.setAttribute('x2', (x + candleWidth / 2).toString());
//       wick.setAttribute('y2', yLow.toString());
//       wick.setAttribute('class', 'stroke-black');
//       svg.appendChild(wick);

//       const candle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//       candle.setAttribute('x', x.toString());
//       candle.setAttribute('y', Math.min(yOpen, yClose).toString());
//       candle.setAttribute('width', candleWidth.toString());
//       candle.setAttribute('height', Math.abs(yClose - yOpen).toString());
//       candle.setAttribute('class', isBullish ? 'fill-green-500 stroke-green-700' : 'fill-red-500 stroke-red-700');
//       svg.appendChild(candle);
//     });
//   };

//   const drawAxes = (
//     svg: SVGSVGElement,
//     chartWidth: number,
//     chartHeight: number,
//     maxPrice: number,
//     minPrice: number
//   ) => {
//     const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//     xAxis.setAttribute('x1', '0');
//     xAxis.setAttribute('y1', chartHeight.toString());
//     xAxis.setAttribute('x2', chartWidth.toString());
//     xAxis.setAttribute('y2', chartHeight.toString());
//     xAxis.setAttribute('class', 'stroke-black');
//     svg.appendChild(xAxis);

//     const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//     yAxis.setAttribute('x1', '0');
//     yAxis.setAttribute('y1', '0');
//     yAxis.setAttribute('x2', '0');
//     yAxis.setAttribute('y2', chartHeight.toString());
//     yAxis.setAttribute('class', 'stroke-black');
//     svg.appendChild(yAxis);
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     setIsPanning(true);
//     panStartRef.current = e.clientX;
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isPanning) return;
//     const deltaX = e.clientX - panStartRef.current;
//     panStartRef.current = e.clientX;
//     setPanOffset((prev) => prev + deltaX);
//   };

//   const handleMouseUp = () => {
//     setIsPanning(false);
//   };

//   useEffect(() => {
//     renderChart();
//   }, [data, timeframe, panOffset]);

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-gray-100"
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp}
//       ref={containerRef}
//     >
//       <div className="flex flex-col items-center bg-white shadow-md p-6 rounded-md">
//         <h1 className="text-2xl font-bold mb-4">Candlestick Chart</h1>
//         <select
//           value={timeframe}
//           onChange={(e) => setTimeframe(parseInt(e.target.value, 10))}
//           className="mb-4 border rounded p-2 text-sm"
//         >
//           <option value="1">1 Minute</option>
//           <option value="5">5 Minutes</option>
//           <option value="15">15 Minutes</option>
//         </select>
//         <div className="w-[800px] overflow-hidden border border-gray-300 rounded-lg">
//           <svg ref={chartRef} className="w-full h-[400px]" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CandlestickChart;

export default function testPage () {
  return (
    <div>
      {/* <CandlestickBackground></CandlestickBackground>
      <div className="flex w-full justify-center h-full mt-20">
      <InsightCard insight={{id: 0, category: "Crypto", createdAt: new Date(), description: "lakatos", isPremium: false, rating: 3, readTime:10, tag: "Hot", title: "Mak"}} user={undefined}></InsightCard>
    </div> */}
    <BackgroundIcons></BackgroundIcons>
    </div>
  )
}
