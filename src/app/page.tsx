"use client"
import React from 'react'
import { GeistSans } from "geist/font/sans";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightIcon, BrainCircuitIcon, UsersIcon, CheckIcon, BadgeCheck, UserPlus,  Heart, XIcon, Bookmark, BookOpenIcon, NewspaperIcon, StarIcon, LockIcon, DollarSignIcon, MessageCircleIcon, TrendingUpIcon, SearchIcon, ArrowUpIcon, ArrowDownIcon, PlayCircleIcon } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import Logo from './_components/Logo/logo';
import CandlestickBackground from './_components/Candlestick_Background/Candlestick_Background';
import BackgroundIcons from './_components/Icons_Background/Icons_Background';
import ShareButton from './_components/Share_Button/Share_Button';
import Image from 'next/image';






export default function Index() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  console.log(enteredEmail);
  const router = useRouter();

  // const post : Post = {
  //   id: 1,
  //   content: "Hey considering investing in $[AAPL]. What do you think about its current performance? I've been following the tech sector closely, and Apple seems to be showing some interesting trends. Any thoughts on whether this is a good entry point?",
  //   userId: 1,
  //   createdAt: new Date("2024-02-12")
  // }
  // const user : User = {
  //   id: 1,
  //   name: "Martin Cerny",
  //   email: "martincerny@volny.cz",
  //   username: "martincerny",
  //   password: "password",
  // }

  // custom hooks or functions

  const redirectToSignUp = () => {
    router.push('/signup')
  }


  



  const postContent = (
    <>
      Hey everyone! I&apos;m considering investing in{" "}
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto font-normal align-baseline">
          <span className="inline-flex items-center border-gray-200 bg-white hover:bg-gray-50 px-2 border duration-200">
            <svg className="mr-1 w-4 h-4 text-gray-400" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-25.9-37.8-65.8-62.5-118.2-72.1-49.9-9.5-103.2 7.2-137.2 21.3-38.5-20.4-90.4-32.2-138.2-21.9-77.8 17.2-146.6 85.1-155 195.9-9.6 125.3 69.7 259.1 126.2 339.5 28.3 39.9 65.6 85.2 114.1 83.9 46.8-1.3 63.9-30.6 119.8-31 55.7-.4 71.8 31 119.1 30.3 49.1-.7 88.5-43.8 115.9-84.3 21.4-30.8 29.7-45.9 46.4-80.5-121.6-47.2-141.5-221.9-85.8-224.6z"/>
              <path d="M642.2 230.7c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"/>
            </svg>
            <span className="mr-1 font-semibold text-gray-700">AAPL</span>
            <span className="text-gray-500 text-sm">$150.25</span>
            <span className="ml-1 font-medium text-green-600 text-sm">+2.5%</span>
          </span>
        </Button>
      </DialogTrigger>
      . What do you think about its current performance?
    </>
  );

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="flex h-14 items-center justify-between px-4 lg:px-6">
          <Logo height={50} width={50} className='mt-5' />
        <nav className="flex flex-1 justify-center">
          <ul className="flex space-x-4 sm:space-x-6">
            <li>
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href="/feed"
              >
                Feed
              </Link>
            </li>
            <li>
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href="/articles"
              >
                Insights
              </Link>
            </li>
            <li>
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href="ai"
              >
                AI Assistant
              </Link>
            </li>
            <li>
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href="assets"
              >
                Assets
              </Link>
            </li>
            <li>
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href="pricing"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </nav>
        <Button variant="outline" onClick={redirectToSignUp}>Create account</Button>
      </header>
      <main className="flex-1">
        <section className="relative flex w-full justify-center overflow-hidden bg-gradient-to-b from-white to-gray-100 py-12 dark:from-gray-900 dark:to-gray-800 md:py-24 lg:py-32 xl:py-48">
          <CandlestickBackground />
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tighter text-transparent dark:from-gray-100 dark:to-gray-400 sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Trade, Exchange & Share
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Join a platform where trading, socializing, and sharing your
                  winnings come together seamlessly.
                </p>
              </div>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  size="lg"
                  className="transform rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                >
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-sm">
                  <TrendingUpIcon className="mr-1 h-4 w-4" />
                  Real-time Trading
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <BrainCircuitIcon className="mr-1 h-4 w-4" />
                  AI Assistant
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <UsersIcon className="mr-1 h-4 w-4" />
                  Social Community
                </Badge>
              </div>

              <div className="w-full max-w-md">
                <div className="relative mt-8 backdrop-blur">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search markets"
                    className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center space-x-2 rounded-full"
                  >
                    <Image
                      src="/assets/AAPL.webp"
                      alt="Apple logo"
                      className="h-6 w-6 rounded-full"
                      height={24}
                      width={24}
                    />
                    <span>AAPL</span>
                    <span className="flex items-center text-green-500">
                      <ArrowUpIcon className="mr-1 h-4 w-4" />
                      2.5%
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center space-x-2 rounded-full"
                  >
                    <Image
                      src="/assets/BTC.webp"
                      alt="Bitcoin logo"
                      className="h-6 w-6 rounded-full"
                      height={500}
                      width={500}
                    />
                    <span>BTC</span>
                    <span className="flex items-center text-red-500">
                      <ArrowDownIcon className="mr-1 h-4 w-4" />
                      1.8%
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center space-x-2 rounded-full"
                  >
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      alt="S&P 500 logo"
                      className="h-6 w-6 rounded-full"
                      height={24}
                      width={24}
                    />
                    <span>S&P 500</span>
                    <span className="flex items-center text-green-500">
                      <ArrowUpIcon className="mr-1 h-4 w-4" />
                      0.7%
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="flex w-full justify-center bg-white py-12 dark:bg-gray-900 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Unlock Your Potential with TXS
                </h2>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience a powerful suite of tools that allows you to easily
                  track market trends, analyze real-time data, and make informed
                  financial decisions. With an intuitive and seamless platform,
                  TXS empowers you to optimize your strategies and stay ahead in
                  the market.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex items-center justify-center">
                    <PlayCircleIcon className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <div className="aspect-video overflow-hidden rounded-xl border bg-gray-100 dark:bg-gray-800">
                <video
                  className="h-full w-full object-cover"
                  poster="/placeholder.svg?height=720&width=1280"
                  src="/placeholder.mp4"
                >
                  <source src="/placeholder.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </section>
        <section className="relative flex w-full justify-center overflow-hidden bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <BackgroundIcons />
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Choose Your Plan
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Select the perfect plan to fuel your investment journey.
                  Whether you&apos;re just starting out or a seasoned trader, we
                  have the right tools for you.
                </p>
              </div>
            </div>
            <div className="mt-12 flex w-full justify-center gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Starter Plan */}
              <Card className="flex flex-col justify-between bg-blue-50 dark:bg-gray-800">
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
                    {[
                      "Basic market analysis",
                      "Limited real-time data",
                      "Community forum access",
                      "Basic portfolio tracking",
                      "AI assistant",
                      "Premium insights",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        {index < 4 ? (
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                        ) : (
                          <XIcon className="mr-2 h-5 w-5 text-red-500" />
                        )}
                        <span
                          className={index >= 4 ? "text-muted-foreground" : ""}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>

              {/* Investor Plan */}
              <Card className="relative flex flex-col justify-between bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-800 dark:to-purple-800">
                <Badge className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/4 bg-yellow-400 text-yellow-900">
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
                    {[
                      "Advanced market analysis",
                      "Full real-time data access",
                      "Community forum access",
                      "Advanced portfolio tracking",
                      "Basic AI-powered insights",
                      "Priority customer support",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        {index < 5 ? (
                          <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                        ) : (
                          <XIcon className="mr-2 h-5 w-5 text-red-500" />
                        )}
                        <span
                          className={index >= 5 ? "text-muted-foreground" : ""}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                    Subscribe Now
                  </Button>
                </CardFooter>
              </Card>

              {/* Trader Plan */}
              <Card className="flex flex-col justify-between bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 dark:from-purple-800 dark:via-pink-800 dark:to-red-800">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Trader
                  </CardTitle>
                  <CardDescription className="text-gray-700 dark:text-gray-200">
                    For professional traders who demand the best
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                      $49.99
                    </span>
                    <span className="text-gray-700 dark:text-gray-200">
                      /month
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Professional-grade analytics",
                      "Real-time data with low latency",
                      "Exclusive trader community access",
                      "Advanced AI-powered insights",
                      "Custom alerts and notifications",
                      "24/7 priority customer support",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckIcon className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                        <span className="text-gray-800 dark:text-gray-100">
                          {feature}
                        </span>
                      </li>
                    ))}
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
        <section className="flex w-full justify-center bg-gray-100 py-12 dark:bg-gray-800 md:py-24">
          <div className="container w-4/5 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Market Insights & Analysis
                </h2>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay ahead of the curve with our expert analysis and in-depth
                  market insights. Our team of financial experts provides you
                  with the latest trends, predictions, and strategies to
                  maximize your investments.
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
                    <CardDescription className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                      Major tech companies see significant gains as AI
                      advancements drive market optimism.
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
                    <CardDescription className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                      Bitcoin and Ethereum prices stabilize as institutional
                      adoption increases.
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
                    <CardDescription className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
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
                    <CardDescription className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                      Discover untapped potential in rapidly growing economies
                      across Asia and Africa.
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

        <section className="flex w-full justify-center bg-white py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Join the Conversation
            </h2>
            <div className="mx-auto max-w-3xl">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                        MC
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="mr-1 text-sm font-medium">Martin Cerny</p>
                          <BadgeCheck className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-muted-foreground">
                            @martincerny
                          </p>
                          <span className="text-xs text-muted-foreground">
                            •
                          </span>
                          <p className="text-xs text-muted-foreground">
                            2h ago
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="ml-auto"
                      onClick={redirectToSignUp}
                    >
                      Follow
                      <UserPlus className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <p className="text-base leading-7">
                        {postContent}
                      </p>
                      <DialogContent
                        className={GeistSans.className + " max-w-4xl"}
                      >
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                            <TrendingUpIcon className="h-6 w-6 text-primary" />
                            AAPL - Apple Inc.
                          </DialogTitle>
                          <DialogDescription>
                            <div className="mt-4 grid grid-cols-3 gap-6">
                              <div className="col-span-2">
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                  <Button
                                    variant="outline"
                                    className="w-full"
                                   
                                  >
                                    <NewspaperIcon className="mr-2 h-4 w-4" />
                                    Latest News
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="w-full"
                                   
                                  >
                                    <DollarSignIcon className="mr-2 h-4 w-4" />
                                    Buy Stock
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-6">
                                <div className="rounded-lg bg-card p-6 shadow">
                                  <p className="text-sm font-medium">
                                    Current Price
                                  </p>
                                  <p className="mt-1 text-3xl font-bold">
                                    $150.25
                                  </p>
                                  <div className="mt-2 flex items-center text-green-600">
                                    <ArrowUpIcon className="mr-1 h-5 w-5" />
                                    <span className="text-lg font-semibold">
                                      +2.5%
                                    </span>
                                  </div>
                                </div>
                                <div className="rounded-lg bg-card p-6 shadow">
                                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                                    Today&apos;s Range
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">$148.75</span>
                                    <span className="text-sm">$151.30</span>
                                  </div>
                                  <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200">
                                    <div
                                      className="h-2.5 rounded-full bg-primary"
                                      style={{ width: "70%" }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="space-y-4 rounded-lg bg-card p-6 shadow">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                      Open
                                    </p>
                                    <p className="text-lg">$148.75</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                      Previous Close
                                    </p>
                                    <p className="text-lg">$146.50</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                      Volume
                                    </p>
                                    <p className="text-lg">32.4M</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
                <Separator className="my-4" />
                <CardFooter>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={redirectToSignUp}
                      >
                        <Heart
                          className="mr-2 h-4 w-4"
                        />
                        <span>69</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={redirectToSignUp}
                      >
                        <MessageCircleIcon className="mr-2 h-4 w-4" />
                        <span>9</span>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={redirectToSignUp}
                      >
                        <Bookmark
                          className="h-4 w-4"
                        />
                        <span className="sr-only">Save</span>
                      </Button>
                      <ShareButton targetRoute='/post/test' type='post'/>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="flex w-full justify-center bg-gray-200 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to get started?
                </h2>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied users and take control of your
                  financial future today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form action={`/signup?email=${enteredEmail}`} className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                    onChange={(e) => setEnteredEmail(e.target.value)}
                  />
                  <Button type="submit">
                    Sign Up
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 TXS Inc. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}