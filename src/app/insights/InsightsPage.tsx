"use client";
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import SecondaryNav from '../_components/Secondary_Nav/Secondary_Nav';
import InsightCard from '../_components/Insight_Card/Insight_Card';
import CandlestickBackground from '../_components/Candlestick_Background/Candlestick_Background';
import { InsightsCategory} from '@prisma/client';
import type { InsightsTag } from '@prisma/client';


interface InsightProps {
  id: number;
  title: string;
  description: string;
  category: InsightsCategory;
  readTime: number;
  isPremium: boolean;
  tag: InsightsTag;
  createdAt: Date;
  rating: number;
}




export default function InsightsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')

  const [selectedCategory, setSelectedCategory] = useState< keyof typeof InsightsCategory | 'All'>('All');
  const categories = Object.keys(InsightsCategory);

  console.log(selectedCategory)
  const insightsPerPage = 9

  // testing insights
  const mockInsights: InsightProps[] = [
    {
      id: 1,
      title: "Tech Stocks Surge",
      description: "Major tech companies see significant gains as AI advancements drive market optimism.",
      category: "Tech",
      rating: 4.9,
      readTime: 5,
      isPremium: false,
      tag: "Trending",
      createdAt: new Date('2024-10-01'),
    },
    {
      id: 2,
      title: "Crypto Market Update",
      description: "Bitcoin and Ethereum prices stabilize as institutional adoption increases.",
      category: "Crypto",
      rating: 4.7,
      readTime: 7,
      isPremium: false,
      tag: "New",
      createdAt: new Date('2024-10-02'),
    },
    {
      id: 3,
      title: "Global Economic Outlook",
      description: "Experts predict steady growth despite ongoing geopolitical tensions.",
      category: "Economy",
      rating: 4.8,
      readTime: 10,
      isPremium: true,
      tag: "Premium",
      createdAt: new Date('2024-09-30'),
    },
    {
      id: 4,
      title: "Emerging Market Opportunities",
      description: "Discover untapped potential in rapidly growing economies across Asia and Africa.",
      category: "Markets",
      rating: 4.6,
      readTime: 6,
      isPremium: false,
      tag: "Hot",
      createdAt: new Date('2024-09-29'),
    },
    {
      id: 5,
      title: "The Rise of Sustainable Investing",
      description: "How ESG factors are becoming crucial in investment decisions and portfolio management.",
      category: "Markets",
      rating: 4.5,
      readTime: 8,
      isPremium: false,
      tag: "Trending",
      createdAt: new Date('2024-09-28'),
    },
    {
      id: 6,
      title: "Decentralized Finance Revolution",
      description: "Exploring the potential of DeFi to disrupt traditional financial systems.",
      category: "Crypto",
      rating: 4.8,
      readTime: 12,
      isPremium: false,
      tag: "Hot",
      createdAt: new Date('2024-09-27'),
    },
    {
      id: 7,
      title: "Impact of Trade Wars on Global Markets",
      description: "Analyzing the effects of ongoing trade disputes on international commerce and investments.",
      category: "Economy",
      rating: 4.7,
      readTime: 9,
      isPremium: true,
      tag: "Important",
      createdAt: new Date('2024-09-26'),
    },
    {
      id: 8,
      title: "5G Technology: Investment Opportunities",
      description: "Identifying potential winners in the race to implement next-generation wireless networks.",
      category: "Tech",
      rating: 4.6,
      readTime: 7,
      isPremium: false,
      tag: "New",
      createdAt: new Date('2024-09-25'),
    },
    {
      id: 9,
      title: "Navigating Inflation: Investor's Guide",
      description: "Strategies to protect your portfolio against rising inflation and maintain purchasing power.",
      category: "Economy",
      rating: 4.9,
      readTime: 11,
      isPremium: true,
      tag: "Important",
      createdAt: new Date('2024-09-24'),
    },
  ]

  

  const filteredAndSortedInsights = mockInsights
    .filter(insight => 
      (selectedCategory === 'All' || insight.category === selectedCategory) &&
      (insight.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       insight.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt.getTime() - a.createdAt.getTime()
      } else if (sortBy === 'popularity') {
        return b.rating - a.rating
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }
      return 0;
    })

  const indexOfLastInsight = currentPage * insightsPerPage
  const indexOfFirstInsight = indexOfLastInsight - insightsPerPage
  const acutalInsights = filteredAndSortedInsights.slice(indexOfFirstInsight, indexOfLastInsight)


  return (
    <div>
      <SecondaryNav />
      <section className="relative flex w-full justify-center overflow-hidden bg-gradient-to-b from-white to-gray-100 py-24">
        <CandlestickBackground />
        <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-5xl font-bold tracking-tighter text-transparent">
          Market Insights & Analysis
        </h1>
      </section>

      <main className="container mx-auto px-32 py-8">
        <div className="mb-8">
          <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200 sm:mb-0">
              All Articles
            </h2>
            <div className="flex w-full flex-col items-center space-y-2 sm:w-auto sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="relative w-full sm:w-64">
                {/* search bar */}
                <SearchIcon className="absolute left-2 top-2 text-gray-400" />
                <Input
                  className="w-full pl-10"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              {/* sorting select */}
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Latest</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* category switch */}
          <Select
            value={selectedCategory as string}
            onValueChange={(value) =>
              setSelectedCategory(
                value as keyof typeof InsightsCategory | "All",
              )
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={"All"} value={"All"}>
                {"All"}
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {acutalInsights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            {/* pagniate to the left */}
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-l-md bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Button>
            {/* pagination buttons */}
            {
              // creates array for number of pages
              Array.from({
                length: Math.ceil(
                  filteredAndSortedInsights.length / insightsPerPage,
                ),
                // iterates trought the array
              }).map((_, index) => (
                <Button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`${
                    currentPage === index + 1
                      ? "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  } border-b border-t`}
                >
                  {index + 1}
                </Button>
              ))
            }
            {/* paginate to the right */}
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredAndSortedInsights.length / insightsPerPage)
              }
              className="rounded-r-md bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </main>
    </div>
  );
}