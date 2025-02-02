import React from "react";
import BackgroundIcons from "../Background/Icons_Background/Icons_Background";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PricingSection: React.FC = () => {
  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-gray-100 py-12 md:py-24 lg:py-32">
      <BackgroundIcons />
      <div className="-mt-12" id="pricing"></div>
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Choose Your Plan
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Select the perfect plan to fuel your investment journey. Whether
              you&apos;re just starting out or a seasoned trader, we have the
              right tools for you.
            </p>
          </div>
        </div>
        <div className="mt-12 flex w-full justify-center gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Starter Plan */}
          <Card className="flex flex-col justify-between bg-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Beginner</CardTitle>
              <CardDescription>
                Perfect for beginners exploring the market
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">Free</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>5-minute timeframes</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>1 chart open at a time</span>
                </li>
                <li className="flex items-center">
                  <XIcon className="mr-2 h-5 w-5 text-red-500" />
                  <span className="text-muted-foreground">No premium insights</span>
                </li>
                <li className="flex items-center">
                  <XIcon className="mr-2 h-5 w-5 text-red-500" />
                  <span className="text-muted-foreground">No AI assistant</span>
                </li>
                <li className="flex items-center">
                  <XIcon className="mr-2 h-5 w-5 text-red-500" />
                  <span className="text-muted-foreground">No portfolio analysis</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>

          {/* Investor Plan */}
          <Card className="relative flex flex-col justify-between bg-gradient-to-br from-blue-100 to-purple-100">
            <Badge className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/4 select-none bg-yellow-400 text-yellow-900">
              Best Value
            </Badge>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Investor</CardTitle>
              <CardDescription>
                Ideal for serious investors seeking growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">$19.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>3-minute timeframes</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>3 charts open at a time</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>Premium insights</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>700 AI requests/month</span>
                </li>
                <li className="flex items-center">
                  <XIcon className="mr-2 h-5 w-5 text-red-500" />
                  <span className="text-muted-foreground">No portfolio analysis</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>

          {/* Trader Plan */}
          <Card className="flex flex-col justify-between bg-gradient-to-br from-purple-100 via-pink-100 to-red-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Trader
              </CardTitle>
              <CardDescription className="text-gray-700">
                For professional traders who demand the best
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-800">$49.99</span>
                <span className="text-gray-700">/month</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>1-minute timeframes</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>6 charts open at a time</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>Premium insights</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>2000 AI requests/month</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                  <span>Advanced portfolio analysis</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
