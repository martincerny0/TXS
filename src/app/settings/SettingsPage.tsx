"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  CheckIcon,
  CreditCard,
  LoaderIcon,
  User as UserIcon,
  XIcon,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAvatar from "../_components/MainElements/User_Avatar/User_Avatar";
import ServerNav from "../_components/MainElements/Main_Nav/MainNav";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Countries, type Country } from "@/types/country";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";

interface SettingsPageProps {
  user: User;
}

const mockTransactions = [
  { id: 1, type: "Deposit", amount: 1000, date: "2023-05-01" },
  { id: 2, type: "Withdrawal", amount: -500, date: "2023-05-15" },
  { id: 3, type: "Deposit", amount: 2000, date: "2023-06-01" },
];

const subscriptionPlans = [
  {
    name: "Beginner",
    price: "Free",
    description: "Perfect for beginners exploring the market",
    features: [
      "5-minute timeframes",
      "1 chart open at a time",
      "No premium insights",
      "No AI assistant",
      "No portfolio analysis",
    ],
  },
  {
    name: "Investor",
    price: "$19.99/month",
    description: "Ideal for serious investors seeking growth",
    features: [
      "3-minute timeframes",
      "3 charts open at a time",
      "Premium insights",
      "700 AI requests/month",
      "No portfolio analysis",
    ],
    highlight: true,
  },
  {
    name: "Trader",
    price: "$49.99/month",
    description: "For professional traders who demand the best",
    features: [
      "1-minute timeframes",
      "6 charts open at a time",
      "Premium insights",
      "2000 AI requests/month",
      "Advanced portfolio analysis",
    ],
  },
];

// email regex
const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


// convert uplaoded image to a base64
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
  });
};


const SettingPage: React.FC<SettingsPageProps> = ({ user }) => {
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState("Investor");

  // utils
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedTab = useSearchParams().get("tab");
  const uploadImageInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();
  // -- update user info mutation
  const updateUserMutation = api.user.changeUserInfo.useMutation();
  const updateImageMutation = api.user.uploadImage.useMutation();

  // user details states
  const [name, setName] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [country, setCountry] = useState<Country>(
    Countries.find((c) => c.country === user.country_abbrev)!,
  );

  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);


  const handleEmailChange = (email: string) => {
    if(emailRegEx.test(email) || email === "") {
      setEmailError(null);
      return setEmail(email);
    }
    setEmailError("Invalid email address");
  };

  const updateUser = async () => {
    setIsLoading(true);
    const response = await updateUserMutation.mutateAsync({
      name,
      bio,
      email,
      phone,
      country,
    });

    if (response.success) {
      setIsLoading(false);
      return toast({
        title: "Success",
        description: "User info updated successfully",
      });
    }
    setIsLoading(false);
    return toast({
      title: "Error",
      description: "There was an error updating your account",
      variant: "destructive",
    });
  };

  const handleCountryChange = (countryCode: string) => {
    const country = Countries.find((c) => c.code === countryCode);
    setCountry(country!);
    if(!phone) return;
    // reevaluate the phone number on the changed country format
    if(country!.regEx.test(phone.replace(/\s+/g, ""))) {
      return setPhoneError("");
    }
    setPhoneError("Invalid phone number");
  };

  const handlePhoneChange = (phone: string) => {
    // validate the phone number based on the selected country
    if(country.regEx.test(phone.replace(/\s+/g, "")) || phone === "") {
      setPhoneError(null);
      return setPhone(phone);
    }
    setPhoneError("Invalid phone number");
  }

  // uploads the file
  const handleFileUpload = async (file: File) => {
    const base64Data = await convertToBase64(file);
  
    // Remove the Base64 prefix ( "data:image/png;base64, etc...)
    const cleanBase64 = base64Data.split(',')[1];
    
    // prevent image from being empty
    if(!cleanBase64) return;

    const response = await updateImageMutation.mutateAsync({
      fileData: cleanBase64,
    });
  
    if(response.success) {
      return toast({
        title: "Success",
        description: "Avatar uploaded successfully",
      });
    }
    return toast({
      title: "Error",
      description: "There was an error uploading your avatar",
      variant: "destructive",
    });
  };

  // gets the file from the input
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  return (
    <div>
      <ServerNav user={user} isBorderBottom />
      <Tabs
        defaultValue={selectedTab ?? "account"}
        className="container mx-auto mt-14 w-2/3 space-y-6"
      >
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="account">
            <UserIcon className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <UserAvatar user={user} />
                <Button onClick={() => uploadImageInputRef.current?.click()}>Change Avatar</Button>
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  ref={uploadImageInputRef}
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder={user.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder={user.bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="tag">Tag</Label>
                <Input id="tag" disabled placeholder={user.tag} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={user.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
              </div>
              <div className="flex w-full space-x-2">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Select
                    name="countryCode"
                    defaultValue={country.code}
                    onValueChange={handleCountryChange}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {Countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center">
                            <Image
                              alt={country.country}
                              src={country.flag}
                              width={20}
                              height={10}
                              className="mr-2"
                              loading="eager"
                            ></Image>
                            <span>{country.code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  className="m-0"
                  onChange={(e) => {handlePhoneChange(e.target.value)}}
                  placeholder={country.placeholder}
                />
                {phoneError && (
                  <p className="text-red-500 text-sm">{phoneError}</p>
                )}
              </div>
              <Button
                className="w-full"
                disabled={(!name && !bio && !phone && !email && !isLoading) || !!emailError || !!phoneError}
                onClick={updateUser}
              >
                {isLoading ? (
                  <div className="animate-spin">
                    <LoaderIcon />
                  </div>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage your notification settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notification After Each Trade</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive an email notification after each trade is completed
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Button className="w-full">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Manage your subscription and view transaction history.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isSubscribed ? (
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Current Subscription
                  </h3>
                  <p>You are currently subscribed to the {currentPlan} plan.</p>
                  <div className="mt-2 space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsSubscribed(false)}
                    >
                      Cancel Subscription
                    </Button>
                    {currentPlan !== "Trader" && (
                      <Button onClick={() => setCurrentPlan("Trader")}>
                        Upgrade
                      </Button>
                    )}
                  </div>
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
                <h3 className="mb-2 text-lg font-semibold">
                  Transaction History
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingPage;
