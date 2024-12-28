"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, Bookmark, Heart, MessageCircleIcon, UserPlus, TrendingUpIcon, ArrowUpIcon, DollarSignIcon, NewspaperIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import ShareButton from "../Share_Button/Share_Button";
import { DialogTrigger } from "@/components/ui/dialog";

const SocialSection : React.FC = () => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
        const router = useRouter();

      const redirectToSignUp = () => {
        return router.push('/signup');
      }
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

      const postContent = (
        <>
          Hey everyone! I&apos;m considering investing in{" "}
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="h-auto p-0 align-baseline font-normal"
            >
              <span className="inline-flex items-center border border-gray-200 bg-white px-2 duration-200 hover:bg-gray-50">
                <svg
                  className="mr-1 h-4 w-4 text-gray-400"
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-25.9-37.8-65.8-62.5-118.2-72.1-49.9-9.5-103.2 7.2-137.2 21.3-38.5-20.4-90.4-32.2-138.2-21.9-77.8 17.2-146.6 85.1-155 195.9-9.6 125.3 69.7 259.1 126.2 339.5 28.3 39.9 65.6 85.2 114.1 83.9 46.8-1.3 63.9-30.6 119.8-31 55.7-.4 71.8 31 119.1 30.3 49.1-.7 88.5-43.8 115.9-84.3 21.4-30.8 29.7-45.9 46.4-80.5-121.6-47.2-141.5-221.9-85.8-224.6z" />
                  <path d="M642.2 230.7c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z" />
                </svg>
                <span className="mr-1 font-semibold text-gray-700">AAPL</span>
                <span className="text-sm text-gray-500">$150.25</span>
                <span className="ml-1 text-sm font-medium text-green-600">
                  +2.5%
                </span>
              </span>
            </Button>
          </DialogTrigger>
          . What do you think about its current performance?
        </>
      );
    
    return (
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
    )
}

export default SocialSection;