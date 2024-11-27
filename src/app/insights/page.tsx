'use client'

import React, { useState, useRef, MouseEvent } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight,Box, Search, Type, Pencil, ZoomIn, Move, Sparkles, Settings, X, TrendingUp, TrendingDown, Plus, Minus, MessageSquare, Camera, Share2, BarChart2, MousePointer, Users, Newspaper, Edit, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Trade } from '@prisma/client'
import Decimal from 'decimal.js'


// Define types
type Asset = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  performance: number;
  logo: string;
}

type Annotation = {
  x: number;
  y: number;
  text: string;
}

type Order = {
  type: 'buy' | 'sell';
  price: number;
  takeProfit: number | null;
  stopLoss: number | null;
}

type Tab = {
  id: string;
  asset: string;
  timeframe: string;
  tool: string;
  zoomArea: { x1: string | null; x2: string | null };
  annotations: Annotation[];
  order: Order | null;
  takeProfitEnabled: boolean;
  stopLossEnabled: boolean;
}

type OpenTrade = {
  id: string;
  asset: string;
  type: 'buy' | 'sell';
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  profitLoss: number;
  takeProfit: number | null;
  stopLoss: number | null;
}

// Mock data for the graph
const data = [
  { date: '2023-01-01', price: 100 },
  { date: '2023-02-01', price: 120 },
  { date: '2023-03-01', price: 110 },
  { date: '2023-04-01', price: 140 },
  { date: '2023-05-01', price: 130 },
  { date: '2023-06-01', price: 160 },
  { date: '2023-07-01', price: 170 },
  { date: '2023-08-01', price: 190 },
  { date: '2023-09-01', price: 180 },
  { date: '2023-10-01', price: 210 },
]

const popularAssets: Asset[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.5, performance: 3.2, logo: '/placeholder.svg?height=32&width=32' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.10, change: -0.8, performance: -1.1, logo: '/placeholder.svg?height=32&width=32' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 305.75, change: 1.2, performance: 1.5, logo: '/placeholder.svg?height=32&width=32' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 3300.00, change: 0.5, performance: 0.7, logo: '/placeholder.svg?height=32&width=32' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 750.50, change: -1.5, performance: -2.1, logo: '/placeholder.svg?height=32&width=32' },
]

const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y', 'All']

// Mock data for social feed
const socialFeed = [
  { id: 1, user: 'JohnDoe', avatar: '/placeholder.svg?height=40&width=40', content: 'Just bought some $AAPL, feeling bullish!', timestamp: '2 hours ago' },
  { id: 2, user: 'JaneSmith', avatar: '/placeholder.svg?height=40&width=40', content: 'What do you think about the recent $TSLA dip?', timestamp: '4 hours ago' },
  { id: 3, user: 'TechGuru', avatar: '/placeholder.svg?height=40&width=40', content: '$GOOGL looking strong after the latest earnings report.', timestamp: '6 hours ago' },
]

// Mock data for latest insights
const latestInsights = [
  { id: 1, title: 'Market Rally Continues', content: 'Major indices hit new highs as tech stocks surge.', timestamp: '1 hour ago' },
  { id: 2, title: 'Fed Announces Rate Decision', content: 'Interest rates remain unchanged in latest meeting.', timestamp: '3 hours ago' },
  { id: 3, title: 'Earnings Season Kicks Off', content: 'Big banks report mixed results to start the quarter.', timestamp: '5 hours ago' },
]

export default function GraphPage() {

 

  // main management
  const [tabs, setTabs] = useState<Tab[]>([{
    id: '1',
    asset: 'AAPL',
    timeframe: '1M',
    tool: 'cursor',
    zoomArea: { x1: null, x2: null },
    annotations: [],
    order: null,
    takeProfitEnabled: false,
    stopLossEnabled: false
  }])
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id?? '1');

  // ai assistant
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false)
  const [aiRecieved, setRecievedMessages] = useState<string>('')
  const [aiMessage, setAIMessage] = useState<string>('')
  const [isAssetModalOpen, setIsAssetModalOpen] = useState<boolean>(false)
  const [rightSidebarContent, setRightSidebarContent] = useState<'social' | 'insights'>('social')
  const [assetQuantity, setAssetQuantity] = useState<number>(1)
  const [assetPrice, setAssetPrice] = useState<number>(popularAssets[0].price)
  const chartRef = useRef<HTMLDivElement>(null)
  const [openTrades, setOpenTrades] = useState<Trade[]>([
    { id: 1, asset: 'AAPL', type: 'Buy', quantity: 10, entryPrice: new Decimal(150), currentPrice: new Decimal(155), takeProfit: new Decimal(150), stopLoss: new Decimal(145) },
    { id: 2, asset: 'GOOGL', type: 'Sell', quantity: 5, entryPrice: 2800, currentPrice: 2750, profitLoss: 250, takeProfit: 2700, stopLoss: 2850 },
    { id: 3, asset: 'TSLA', type: 'Buy', quantity: 20, entryPrice: 700, currentPrice: 720, profitLoss: 400, takeProfit: 750, stopLoss: 680 },
  ])
  const [freeCash, setFreeCash] = useState<number>(50000) // Initial free cash









  const getCurrentTab = () => tabs.find(tab => tab.id === activeTab) || tabs[0]

  const updateCurrentTab = (updates: Partial<Tab>) => {
    setTabs(tabs.map(tab => tab.id === activeTab ? { ...tab, ...updates } : tab))
  }

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const currentTab = getCurrentTab()
    if (currentTab.tool === 'text' && chartRef.current) {
      const chartElement = chartRef.current
      const rect = chartElement.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newAnnotation = { x, y, text: 'New annotation' }
      updateCurrentTab({ annotations: [...currentTab.annotations, newAnnotation] })
    }
  }

  const handleQuantityChange = (change: number) => {
    setAssetQuantity(Math.max(0, assetQuantity + change))
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseFloat(e.target.value)
    if (!isNaN(newPrice) && newPrice >= 0) {
      setAssetPrice(newPrice)
    }
  }

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value)
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setAssetQuantity(newQuantity)
    }
  }

  const handleBuy = () => {
    const currentTab = getCurrentTab()
    updateCurrentTab({
      order: {
        type: 'buy',
        price: assetPrice,
        takeProfit: currentTab.takeProfitEnabled ? assetPrice * 1.1 : null,
        stopLoss: currentTab.stopLossEnabled ? assetPrice * 0.9 : null,
      }
    })
    // Add new trade to openTrades
    const newTrade: OpenTrade = {
      id: (openTrades.length + 1).toString(),
      asset: currentTab.asset,
      type: 'buy',
      quantity: assetQuantity,
      entryPrice: assetPrice,
      currentPrice: assetPrice,
      profitLoss: 0,
      takeProfit: currentTab.takeProfitEnabled ? assetPrice * 1.1 : null,
      stopLoss: currentTab.stopLossEnabled ? assetPrice * 0.9 : null,
    }
    setOpenTrades([...openTrades, newTrade])
    // Update free cash
    setFreeCash(prevFreeCash => prevFreeCash - (assetPrice * assetQuantity))
  }

  const handleSell = () => {
    const currentTab = getCurrentTab()
    updateCurrentTab({
      order: {
        type: 'sell',
        price: assetPrice,
        takeProfit: currentTab.takeProfitEnabled ? assetPrice * 0.9 : null,
        stopLoss: currentTab.stopLossEnabled ? assetPrice * 1.1 : null,
      }
    })
    // Add new trade to openTrades
    const newTrade: OpenTrade = {
      id: (openTrades.length + 1).toString(),
      asset: currentTab.asset,
      type: 'sell',
      quantity: assetQuantity,
      entryPrice: assetPrice,
      currentPrice: assetPrice,
      profitLoss: 0,
      takeProfit: currentTab.takeProfitEnabled ? assetPrice * 0.9 : null,
      stopLoss: currentTab.stopLossEnabled ? assetPrice * 1.1 : null,
    }
    setOpenTrades([...openTrades, newTrade])
    // Update free cash
    setFreeCash(prevFreeCash => prevFreeCash + (assetPrice * assetQuantity))
  }

  const closeTrade = (tradeId: string) => {
    const tradeToClose = openTrades.find(trade => trade.id === tradeId)
    if (tradeToClose) {
      // Update free cash
      setFreeCash(prevFreeCash => prevFreeCash + (tradeToClose.currentPrice * tradeToClose.quantity))
      // Remove trade from openTrades
      setOpenTrades(openTrades.filter(trade => trade.id !== tradeId))
    }
  }

  const editTrade = (tradeId: string, updates: Partial<OpenTrade>) => {
    setOpenTrades(openTrades.map(trade => 
      trade.id === tradeId ? { ...trade, ...updates } : trade
    ))
  }

  const addNewTab = () => {
    const newTabId = (parseInt(tabs[tabs.length - 1].id) + 1).toString()
    const newTab = {
      id: newTabId,
      asset: 'AAPL',
      timeframe: '1M',
      tool: 'cursor',
      zoomArea: { x1: null, x2: null },
      annotations: [],
      order: null,
      takeProfitEnabled: false,
      stopLossEnabled: false
    }
    setTabs([...tabs, newTab])
    setActiveTab(newTabId)
  }

  const closeTab = (tabId: string) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter(tab => tab.id !== tabId)
      setTabs(newTabs)
      if (activeTab === tabId) {
        setActiveTab(newTabs[newTabs.length - 1].id)
      }
    }
  }

  const changeAsset = (tabId: string, newAsset: string) => {
    setTabs(tabs.map(tab => tab.id === tabId ? { ...tab, asset: newAsset } : tab))
  }

  const totalValue = assetQuantity * assetPrice

  // Calculate total portfolio value
  const totalPortfolioValue = openTrades.reduce((total, trade) => {
    return total + (trade.currentPrice * trade.quantity);
  }, 0);

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-1">
        {/* Left sidebar for tools */}
        <div className="flex flex-col items-center justify-center border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-4 border-r w-16">
          <div className="space-y-4 ml-2 mt-32">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => updateCurrentTab({ tool: 'cursor' })}>
                    <MousePointer className="w-6 h-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Cursor (Default)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => updateCurrentTab({ tool: 'text' })}>
                    <Type className="w-6 h-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Add text annotations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => updateCurrentTab({ tool: 'draw' })}>
                    <Pencil className="w-6 h-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Draw on graph</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => updateCurrentTab({ tool: 'geometry' })}>
                    <Box className="w-6 h-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Draw Geometry</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => updateCurrentTab({ tool: 'zoom' })}>
                    <ZoomIn className="w-6 h-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Zoom graph</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setIsAIOpen(!isAIOpen)}>
                    <Sparkles className="w-6 h-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>AI Assistant</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="mt-auto">
                  <Settings className="w-6 h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1">
            <div className="flex justify-between items-center border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 border-b">
              <div className="flex items-center">
                <TabsList className="bg-transparent h-10">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="relative data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-none px-4 py-2 data-[state=active]:border-b-0 rounded-t-lg data-[state=active]:text-primary"
                    >
                      {tab.asset}
                      {tabs.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            closeTab(tab.id)
                          }}
                          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <Button variant="ghost" size="sm" onClick={addNewTab} className="ml-2">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/conversation">
                          <MessageSquare className="w-5 h-5" />
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
                      <Button variant="ghost" size="sm" className="rounded-full" asChild>
                        <Link href="/account">
                          <Image src="/placeholder-user.jpg" width="32" height="32" className="rounded-full" alt="User Avatar" />
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

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="flex flex-1 m-0 p-0 overflow-hidden">
                <div className="flex flex-col flex-1 overflow-hidden">
                  {/* Top bar */}
                  <div className="flex justify-between items-center border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 border-b">
                    <div className="flex items-center space-x-4">
                      <Dialog open={isAssetModalOpen} onOpenChange={setIsAssetModalOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            {tab.asset}
                            <Search className="ml-2 w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Search Assets</DialogTitle>
                            <DialogDescription>
                              Enter the symbol or name of the asset you want to view.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="gap-4 grid py-4">
                            <div className="items-center gap-4 grid grid-cols-4">
                              <Input
                                id="asset-search"
                                placeholder="Search assets..."
                                className="col-span-4"
                              />
                            </div>
                            <div className="gap-2 grid">
                              {popularAssets.map((asset) => (
                                <Button
                                  key={asset.symbol}
                                  variant="outline"
                                  className="justify-start"
                                  onClick={() => {
                                    changeAsset(tab.id, asset.symbol)
                                    setIsAssetModalOpen(false)
                                  }}
                                >
                                  <Image src={asset.logo} alt={asset.name} width={24} height={24} className="mr-2 rounded-full" />
                                  <span>{asset.symbol} - {asset.name}</span>
                                </Button>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Select value={tab.timeframe} onValueChange={(value) => updateCurrentTab({ timeframe: value })}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeframes.map((tf) => (
                            <SelectItem key={tf} value={tf}>{tf}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                              <BarChart2 className="mr-2 w-4 h-4" />
                              Indicators
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add Indicators</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Camera className="mr-2 w-4 h-4" />
                              Snapshot
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Take a Snapshot</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Share2 className="mr-2 w-4 h-4" />
                              Share
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Share Graph</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="flex-1 relative bg-red-400" onClick={handleClick} ref={chartRef}>
                    kokot
                  </div>
                </div>

                {/* Right sidebar */}
                <div className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 border-l w-64 overflow-y-auto">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4 overflow-hidden">
                      <h2 className="font-bold text-xl">
                        {rightSidebarContent === 'social' ? 'Social Feed' : 'Latest Insights'}
                      </h2>
                      <div className="flex space-x-2">
                        <Button
                          variant={rightSidebarContent === 'social' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setRightSidebarContent(rightSidebarContent === 'social' ? 'insights' : 'social')}
                          >
                          <Users className="mr-2 w-4 h-4" />
                          {rightSidebarContent === 'social' ?  'Latest' : 'Social'}
                        </Button>
                      </div>
                    </div>
                    {rightSidebarContent === 'social' ? (
                      <div className="space-y-4">
                        {socialFeed.map((post) => (
                          <Card key={post.id} className="p-4">
                            <div className="flex items-start space-x-4">
                              <Image src={post.avatar} alt={post.user} width={40} height={40} className="rounded-full" />
                              <div>
                                <h4 className="font-bold">{post.user}</h4>
                                <p className="text-sm">{post.content}</p>
                                <p className="mt-1 text-gray-500 text-xs">{post.timestamp}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                      
                    ) : (
                      <div className="space-y-4">
                        {latestInsights.map((insight) => (
                          <Card key={insight.id} className="p-4">
                            <h4 className="font-bold">{insight.title}</h4>
                            <p className="text-sm">{insight.content}</p>
                            <p className="mt-1 text-gray-500 text-xs">{insight.timestamp}</p>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Open Trades and Portfolio Value */}
      <div className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl">Open Trades</h2>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Total Portfolio Value</p>
            <p className="font-bold text-2xl">${totalPortfolioValue.toLocaleString()}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Free Cash</p>
          <p className="font-semibold text-lg">${freeCash.toLocaleString()}</p>
        </div>
        <div className="overflow-x-auto">
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
              {openTrades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell className="font-medium">{trade.asset}</TableCell>
                  <TableCell className={trade.type === 'buy' ? 'text-green-600' : 'text-red-600'}>
                    {trade.type.toUpperCase()}
                  </TableCell>
                  <TableCell>{trade.quantity}</TableCell>
                  <TableCell>${trade.entryPrice.toFixed(2)}</TableCell>
                  <TableCell>${trade.currentPrice.toFixed(2)}</TableCell>
                  <TableCell>${trade.takeProfit?.toFixed(2) || '-'}</TableCell>
                  <TableCell>${trade.stopLoss?.toFixed(2) || '-'}</TableCell>
                  <TableCell className={trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                    ${Math.abs(trade.profitLoss).toFixed(2)}
                    {trade.profitLoss >= 0 ? ' (+)' : ' (-)'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => editTrade(trade.id, {})}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => closeTrade(trade.id)}>
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Asset Performance */}
      <div className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 border-t">
        <h2 className="mb-4 font-bold text-xl">Asset Performance</h2>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {popularAssets.map((asset) => (
            <Card key={asset.symbol} className="p-4">
              <div className="flex items-center space-x-4">
                <Image src={asset.logo} alt={asset.name} width={32} height={32} className="rounded-full" />
                <div className="flex-grow">
                  <h4 className="font-bold">{asset.symbol}</h4>
                  <p className="text-gray-500 text-sm">{asset.name}</p>
                </div>
                <div className={`text-sm ${asset.performance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {asset.performance >= 0 ? '+' : ''}{asset.performance.toFixed(2)}%
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Assistant Popover */}
      <Popover open={isAIOpen} onOpenChange={setIsAIOpen}>
        <PopoverContent className="w-80" side="right" align="start">
          <div className="space-y-4">
            <h3 className="font-medium">AI Assistant</h3>
            <div className="space-y-2">
              {["Analyze performance", "Predict trends", "Compare assets", "Explain movements", "Suggest allocation"].map((snippet, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start w-full"
                  onClick={() => setAIMessage(snippet)}
                >
                  {snippet}
                </Button>
              ))}
            </div>
            {aiMessage && (
              <div className="pt-4 border-t">
                <p className="text-sm">{aiMessage}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => setAIMessage('')}
                >
                  <X className="mr-2 w-4 h-4" />
                  Clear
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
