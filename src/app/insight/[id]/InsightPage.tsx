"use client"
import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import type { Insight } from "@prisma/client"
import InsightCard from '@/app/_components/Insight_Card/Insight_Card'
import Footer from '@/app/_components/Footer/Footer'
import SecondaryNav from '@/app/_components/Secondary_Nav/Secondary_Nav'
import StarRating  from '@/app/_components/Star_Rating/Star_Rating'

const mockInsights: Insight[] = [
    {
      id: 1,
      title: "Breaking Trends in AI",
      content: "This article explores the latest developments in AI and how they are shaping the future.",
      description: "AI trends shaping the future.",
      category: "Tech",
      tag: "Trending",
      readTime: 8,
      premium: true,
      redactorId: 101,
      createdAt: new Date('2023-12-01T10:30:00Z'),
    },
    {
      id: 2,
      title: "The Future of Renewable Energy",
      content: "An in-depth look at renewable energy technologies and their impact on sustainability.",
      description: "Renewable energy technologies.",
      category: "Crypto",
      tag: "New",
      readTime: 12,
      premium: false,
      redactorId: 102,
      createdAt: new Date('2023-12-05T15:45:00Z'),
    }
]

interface InsightPageProps {
    id: number;
}

export default function InsightPage({ id }: InsightPageProps) {
    const [userRating, setUserRating] = useState<number | null>(null)
    const [averageRating, setAverageRating] = useState(4.5)

    const handleRatingChange = (newRating: number) => {
        setUserRating(newRating)
        setAverageRating((averageRating + newRating) / 2)
    }

    return (
      <div className="flex min-h-[100dvh] flex-col">
        <SecondaryNav />
        <main className="flex-1 bg-gray-50">
          <article className="container mx-auto px-4 py-8 md:py-12 lg:max-w-4xl">
            {/* article header */}
            <div className="mb-8">
              <Badge className="mb-2 bg-gradient-to-t from-red-500 to-red-500/60">
                Tech
              </Badge>
              <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                AI Revolution in Stock Market Prediction
              </h1>
              <div className="flex items-center text-sm text-gray-500">
                <span>By Martin Cerny</span>
                <span className="mx-2">•</span>
                <time dateTime="2024-03-15">December 28, 2024</time>
                <span className="mx-2">•</span>
                <span>8 min read</span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <StarIcon className="mr-1 h-4 w-4 text-yellow-400" />
                  <span>{averageRating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=200&width=300"
              alt="AI and Stock Market"
              width={300}
              height={200}
              className="mb-8 rounded-lg"
            />
            {/* article body */}
            <div className="prose prose-lg max-w-none">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <h2>Lorem Ipsum</h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Sed do eiusmod tempor incididunt</li>
                <li>Ut labore et dolore magna aliqua</li>
              </ul>
              <h2>Dolor Sit Amet</h2>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
              <h2>Consectetur Adipiscing</h2>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="mt-8 border-t pt-4">
              <h3 className="mb-2 text-lg font-semibold">Rate this article</h3>
              {/* user rating */}
              <StarRating
                initialRating={userRating ?? 0}
                onRatingChange={handleRatingChange}
              />
              {userRating && (
                <p className="mt-2 text-sm text-gray-600">
                  Thank you for rating this article!
                </p>
              )}
            </div>
          </article>

          {/* related/reccomende articles */}
          <section className="container mx-auto px-4 py-8 lg:max-w-4xl">
            <h3 className="mb-6 text-2xl font-bold">Related Articles</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockInsights.map((article, index) => (
                <InsightCard key={index} insight={article} />
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
}

