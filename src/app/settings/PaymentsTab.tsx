"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckIcon,
  XIcon,
  CircleFadingArrowUp,
  CircleX
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "next-auth";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/trpc/react";

  interface PaymentTabProps {
    user : User;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
  }
const PaymentsTab : React.FC<PaymentTabProps> = ({user}) => {
      const [showCancelDialog, setShowCancelDialog] = useState(false);


      // data fetching queries
      const { data : userSubscription, isLoading : isLoadingSubscription } = api.user.getUserActiveSubscription.useQuery();
      const { data: subscriptionPlans, isLoading: isLoadingPlans } = api.subscription.getSubscriptionPlans.useQuery();
      const { data: transactions, isLoading: isLoadingTransactions } = api.user.getUserTransactions.useQuery();

      // @ts-expect-error: This is a reminder to put actual subscription data like expire etc, after stripe intgeration
        const subscriptionReminder: never = "TODO: Remove this after fixing the subscription info";
    

      if(isLoadingSubscription || isLoadingPlans || isLoadingTransactions) return <div>Loading...</div>;

      if( !subscriptionPlans || !transactions) return <div>Error loading data</div>;
    return (
        <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Manage your subscription and view transaction history.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {userSubscription ? (
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Current Subscription
                  </h3>
                  <p className="text-sm text-muted-foreground">
          You are currently subscribed to the <span className="font-medium">{userSubscription?.plan.name}</span> plan.
        </p>
        <p className="text-xs text-muted-foreground mb-4">

          Which will automatically renew on {userSubscription?.createdAt.toDateString()}. 
        </p>
        <div className="mt-4 space-x-2">
          <Button variant="outline" className="hover:bg-red-500 hover:text-white hover:border-red-500" onClick={() => setShowCancelDialog(true)}>
            Cancel Subscription <CircleX />
          </Button>
          {userSubscription?.plan.id !== subscriptionPlans[subscriptionPlans?.length - 1]?.id && (
            <Button>
              Upgrade to {subscriptionPlans[subscriptionPlans?.findIndex(plan => plan.id === userSubscription?.plan.id) + 1]?.name} <CircleFadingArrowUp />
            </Button>
          )}
        </div>
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cancellation</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to cancel your subscription? Your subscription will remain active until the {userSubscription?.createdAt.toDateString()}.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              No, Keep Subscription
            </Button>
            <Button variant="destructive" onClick={() => {
              setShowCancelDialog(false);
            }}>
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
        </Dialog>
                </div>
              ) : (
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Subscription Plans
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="flex flex-col justify-between bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                          Beginner
                        </CardTitle>
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
                            <span className="text-muted-foreground">
                              No premium insights
                            </span>
                          </li>
                          <li className="flex items-center">
                            <XIcon className="mr-2 h-5 w-5 text-red-500" />
                            <span className="text-muted-foreground">
                              No AI assistant
                            </span>
                          </li>
                          <li className="flex items-center">
                            <XIcon className="mr-2 h-5 w-5 text-red-500" />
                            <span className="text-muted-foreground">
                              No portfolio analysis
                            </span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Get Started</Button>
                      </CardFooter>
                    </Card>

                    {/* Investor Plan */}
                    <Card className="relative flex flex-col justify-between bg-gradient-to-br from-blue-100 to-purple-100">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                          Investor
                        </CardTitle>
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
                            <span className="text-muted-foreground">
                              No portfolio analysis
                            </span>
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
                          <span className="text-4xl font-bold text-gray-800">
                            $49.99
                          </span>
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
              )}
              <div>
                <div className="space-x-2 flex w-full justify-between">
                <h3 className="mb-2 text-lg font-semibold">
                  Transaction History
                </h3>
                <div className="space-x-2 flex w-1/2 justify-end">
                <Button variant={"outline"}>Withdraw</Button>
                <Button variant={"default"}>Deposit</Button>
                </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions?.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell className={`${transaction.type === "Withdraw" ? "text-red-500" : "text-green-500"}`}>${transaction.type === "Withdraw" && "-"}{transaction.amount.toString()}</TableCell>
                        <TableCell>{transaction.createdAt.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
    );
}
export default PaymentsTab;