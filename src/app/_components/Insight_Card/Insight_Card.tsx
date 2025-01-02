"use client";
import React from 'react';
import { CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import { StarIcon, BookOpenIcon, LockIcon } from 'lucide-react';
import type { InsightsCategory, InsightsTag } from '@prisma/client';
import RedirectCard from '../Redirect_Card/Redirect_Card';

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

interface InsightCardProps {
  insight: InsightProps;
}

enum tagColors {
  "Trending" = "from-primary to-primary/60",
  "New" = "from-blue-500 to-blue-500/60",
  "Premium" = "from-purple-500 to-purple-500/60",
  "Hot" = "from-orange-500 to-orange-500/60",
  "Essential" = "from-green-500 to-green-500/60",
  "Important" = "from-red-500 to-red-500/60",
}

const InsightCard : React.FC <InsightCardProps> = ({insight}) => {

  const isUserSubscribed = false;
  const isUnlocked = !insight.isPremium || isUserSubscribed;

  return (
    <RedirectCard href={`/insight/${insight.id}`} className="flex transform flex-col overflow-hidden bg-white transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md dark:bg-gray-800">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            width={300}
            height={200}
            src={`/insights/thumbnail/${insight.id}.webp`}
            alt={"Thubmnail of the insight"}
            className="h-48 w-full object-cover"
          />
          <div
            className={`absolute left-0 top-0 bg-gradient-to-r ${tagColors[insight.tag]} px-2 py-1 text-xs font-semibold text-white`}
          >
            {insight.tag}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-normal">
            {insight.category}
          </Badge>
          <div className="flex items-center text-yellow-500">
            <StarIcon className="mr-1 h-4 w-4" />
            <span className="text-sm">{insight.rating}</span>
          </div>
        </div>
        <CardTitle className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-200">
          {insight.title}
          {!isUnlocked && (
            <LockIcon className="ml-2 inline-block h-4 w-4 text-yellow-500" />
          )}
        </CardTitle>
        <CardDescription className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {insight.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Button
          variant="link"
          className="h-auto p-0 text-sm text-gray-700 transition-colors duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
        >
          {!isUnlocked ? "Subscribe" : "Read More"}
        </Button>
        <div className="flex items-center text-sm text-gray-500">
          <BookOpenIcon className="mr-1 h-4 w-4" />
          {insight.readTime} min
        </div>
      </CardFooter>
    </RedirectCard>
  );
}

export default InsightCard;