import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Newspaper } from "lucide-react";
import SocialPostCard from "@/app/_components/Social/SocialPost_Card/SocialPost_Card";
import type { Post } from "@/types/post";
import type { InsightShort } from "@/types/insight";
import InsightShortCard from "@/app/_components/Insight/InsightShort_Card/InsightShort_Card";

// Mock data
const mockSocialFeed: [Post, Post, Post] = [
  {
    id: 1,
    user: {
      id: 3,
      name: "JohnDoe",
      tag: "@johndoe",
      email: "laka@fhf.cz",
      isNotification: true,
      isSubscribed: true,
    },
    content: "Just bought some $AAPL, feeling bullish!",
    createdAt: new Date("2021-10-01T12:00:00"),
  },
  {
    id: 2,
    user: {
      id: 5,
      name: "CryptoKing",
      tag: "@cryptoking",
      email: "laka@fhf.cz",
      isNotification: true,
      isSubscribed: true,
    },
    content:
      "🚨 Never gonna give you up, never gonna let you down. Wait… why are you singing? 😏",
    createdAt: new Date("2021-10-01T12:00:00"),
  },
  {
    id: 3,
    user: {
      id: 6,
      name: "StocksGuru",
      tag: "@stocksguru",
      email: "laka@fhf.cz",
      isNotification: true,
      isSubscribed: true,
    },
    content: "$GOOGL looking strong after the latest earnings report.",
    createdAt: new Date("2021-10-01T12:00:00"),
  },
];

const mockLatestInsights: [InsightShort, InsightShort, InsightShort] = [
  {
    id: 1,
    title: "Market Rally Continues",
    description: "Stocks continue to climb as investors remain optimistic.",
    isPremium: true,
    createdAt: new Date("2021-10-01T12:00:00"),
  },
  {
    id: 2,
    title: "Fed Announces Rate Decision",
    description: "Interest rates remain unchanged in latest meeting.",
    isPremium: false,
    createdAt: new Date("2021-10-01T12:00:00"),
  },
  {
    id: 3,
    title: "Earnings Season Kicks Off",
    description: "Big banks report mixed results to start the quarter.",
    isPremium: false,
    createdAt: new Date("2021-10-01T12:00:00"),
  },
];

const RelatedSidebar: React.FC = () => {
  const [isSocial, setIsSocial] = useState(true);

  return (
    <div className="w-64 overflow-y-hidden border-l border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              variant={isSocial ? "default" : "outline"}
              size="sm"
              onClick={() => setIsSocial(true)}
            >
              <Users className="mr-2 h-4 w-4" />
              Social
            </Button>
            <Button
              variant={!isSocial ? "default" : "outline"}
              size="sm"
              onClick={() => setIsSocial(false)}
            >
              <Newspaper className="mr-2 h-4 w-4" />
              Insights
            </Button>
          </div>
        </div>
        {isSocial ? (
          <div className="space-y-4">
            {mockSocialFeed.map((post) => (
              <SocialPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {mockLatestInsights.map((insight) => (
              <InsightShortCard key={insight.id} insight={insight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedSidebar;
