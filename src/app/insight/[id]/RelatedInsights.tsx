import InsightCard from '@/app/_components/Insight_Card/Insight_Card';
import React from 'react';
import type { InsightsCategory, InsightsTag } from '@prisma/client';


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

const RelatedInsights : React.FC = () => {

    // testing insights
  const mockInsights: InsightProps[] = [
    {
      id: 1,
      title: "Tech Stocks Surge",
      description:
        "Major tech companies see significant gains as AI advancements drive market optimism.",
      category: "Tech",
      rating: 4.9,
      readTime: 5,
      isPremium: false,
      tag: "Trending",
      createdAt: new Date("2024-10-01"),
    },
    {
      id: 2,
      title: "Crypto Market Update",
      description:
        "Bitcoin and Ethereum prices stabilize as institutional adoption increases.",
      category: "Crypto",
      rating: 4.7,
      readTime: 7,
      isPremium: false,
      tag: "New",
      createdAt: new Date("2024-10-02"),
    },
    {
      id: 3,
      title: "Global Economic Outlook",
      description:
        "Experts predict steady growth despite ongoing geopolitical tensions.",
      category: "Economy",
      rating: 4.8,
      readTime: 10,
      isPremium: true,
      tag: "Premium",
      createdAt: new Date("2024-09-30"),
    },
    {
      id: 4,
      title: "Emerging Market Opportunities",
      description:
        "Discover untapped potential in rapidly growing economies across Asia and Africa.",
      category: "Markets",
      rating: 4.6,
      readTime: 6,
      isPremium: false,
      tag: "Hot",
      createdAt: new Date("2024-09-29"),
    },
  ];

    return (
        <section className="container mx-auto px-4 py-8 lg:max-w-4xl">
        <h3 className="mb-6 text-2xl font-bold">Related Articles</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockInsights.slice(0,3).map((insight, index) => (
            <InsightCard key={index} insight={insight} />
          ))}
        </div>
      </section>
    );
}

export default RelatedInsights;