import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenIcon, LockIcon, NewspaperIcon, StarIcon } from "lucide-react";



const InsightsSection : React.FC = () => {

return (
  <section className="flex w-full justify-center bg-gray-100 py-12 md:py-24">
    <div className="container w-4/5 px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
        <div className="flex flex-col justify-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Market Insights & Analysis
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Stay ahead of the curve with our expert analysis and in-depth market
            insights. Our team of financial experts provides you with the latest
            trends, predictions, and strategies to maximize your investments.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button className="inline-flex items-center justify-center">
              <NewspaperIcon className="mr-2 h-4 w-4" />
              Read Latest Articles
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src="/articles/ai.webp"
                  alt="Tech stocks graph"
                  className="h-32 w-full object-cover"
                  height={300}
                  width={500}
                />
                <div className="absolute left-0 top-0 bg-gradient-to-r from-primary to-primary/60 px-2 py-1 text-xs font-semibold text-primary-foreground">
                  Trending
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="mb-1 flex items-center justify-between">
                <Badge variant="outline" className="text-xs font-normal">
                  Tech
                </Badge>
                <div className="flex items-center text-yellow-500">
                  <StarIcon className="mr-1 h-3 w-3" />
                  <span className="text-xs">4.9</span>
                </div>
              </div>
              <CardTitle className="text-base font-bold">
                Tech Stocks Surge
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-2 text-xs text-gray-500">
                Major tech companies see significant gains as AI advancements
                drive market optimism.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-3 pt-0">
              <Button variant="link" className="h-auto p-0 text-xs">
                Read More
              </Button>
              <div className="flex items-center text-xs text-gray-500">
                <BookOpenIcon className="mr-1 h-3 w-3" />5 min
              </div>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src="/articles/btc.webp"
                  alt="Cryptocurrency coins"
                  className="h-32 w-full object-cover"
                  height={300}
                  width={500}
                />
                <div className="absolute left-0 top-0 bg-gradient-to-r from-blue-500 to-blue-500/60 px-2 py-1 text-xs font-semibold text-white">
                  New
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="mb-1 flex items-center justify-between">
                <Badge variant="outline" className="text-xs font-normal">
                  Crypto
                </Badge>
                <div className="flex items-center text-yellow-500">
                  <StarIcon className="mr-1 h-3 w-3" />
                  <span className="text-xs">4.7</span>
                </div>
              </div>
              <CardTitle className="text-base font-bold">
                Crypto Market Update
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-2 text-xs text-gray-500">
                Bitcoin and Ethereum prices stabilize as institutional adoption
                increases.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-3 pt-0">
              <Button variant="link" className="h-auto p-0 text-xs">
                Read More
              </Button>
              <div className="flex items-center text-xs text-gray-500">
                <BookOpenIcon className="mr-1 h-3 w-3" />7 min
              </div>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src="/articles/earth.webp"
                  alt="Global economy illustration"
                  className="h-32 w-full object-cover"
                  height={300}
                  width={500}
                />
                <div className="absolute left-0 top-0 bg-gradient-to-r from-purple-500 to-purple-500/60 px-2 py-1 text-xs font-semibold text-white">
                  Premium
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="mb-1 flex items-center justify-between">
                <Badge variant="outline" className="text-xs font-normal">
                  Economy
                </Badge>
                <div className="flex items-center text-yellow-500">
                  <StarIcon className="mr-1 h-3 w-3" />
                  <span className="text-xs">4.8</span>
                </div>
              </div>
              <CardTitle className="flex items-center text-base font-bold">
                Global Economic Outlook
                <LockIcon className="ml-1 h-3 w-3 text-yellow-500" />
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-2 text-xs text-gray-500">
                Experts predict steady growth despite ongoing geopolitical
                tensions.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-3 pt-0">
              <Button variant="link" className="h-auto p-0 text-xs">
                Subscribe to Read
              </Button>
              <div className="flex items-center text-xs text-gray-500">
                <BookOpenIcon className="mr-1 h-3 w-3" />
                10 min
              </div>
            </CardFooter>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src="/articles/asia.webp"
                  alt="Emerging markets graph"
                  className="h-32 w-full object-cover"
                  height={300}
                  width={500}
                />
                <div className="absolute left-0 top-0 bg-gradient-to-r from-orange-500 to-orange-500/60 px-2 py-1 text-xs font-semibold text-white">
                  Hot
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="mb-1 flex items-center justify-between">
                <Badge variant="outline" className="text-xs font-normal">
                  Markets
                </Badge>
                <div className="flex items-center text-yellow-500">
                  <StarIcon className="mr-1 h-3 w-3" />
                  <span className="text-xs">4.6</span>
                </div>
              </div>
              <CardTitle className="text-base font-bold">
                Emerging Market Opportunities
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-2 text-xs text-gray-500">
                Discover untapped potential in rapidly growing economies across
                Asia and Africa.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-3 pt-0">
              <Button variant="link" className="h-auto p-0 text-xs">
                Read More
              </Button>
              <div className="flex items-center text-xs text-gray-500">
                <BookOpenIcon className="mr-1 h-3 w-3" />6 min
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  </section>
);
}

export default InsightsSection;