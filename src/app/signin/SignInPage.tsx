"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftIcon, Loader2Icon, MailIcon, MailCheckIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react";
import Logo from "../_components/Logo/Logo";
import CandlestickBackground from "../_components/Candlestick_Background/Candlestick_Background";




export default function SignIn () {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await signIn("email", { email, redirect: false });
  
    setIsSubmitted(true);
    setIsLoading(false);
  }

  return (
    <>  
    <div className="relative flex min-h-screen flex-col bg-gray-50 dark:bg-zinc-900 overflow-hidden">
      <CandlestickBackground />
      <div className="container relative z-10 mx-auto flex flex-grow items-center justify-center px-4 py-8">
        <div className="relative flex w-full max-w-5xl flex-col items-center gap-8 md:flex-row">
          <Link
            href="/"
            className="absolute -top-16 left-0 flex items-center text-gray-600 transition-colors hover:text-gray-900 md:-left-4 md:top-0"
            aria-label="Go back to previous page"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Link>
          <div className="flex flex-col justify-center md:w-1/2">
            <div className="mb-4 flex items-center">
              <Logo height={40} width={40} className="w-20 h-20"/>
            </div>
            <p className="mb-6 text-lg text-gray-600">
              Welcome back! Sign-in link and access your investment dashboard.
            </p>
          </div>
          <Card className="w-full md:w-1/2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Sign in to your account
              </CardTitle>
              <CardDescription>
                {isSubmitted ? ("Link was sent to your email adress"):("Enter your email to receive a secure sign-in link")}
              </CardDescription>
            </CardHeader>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="zajicek@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? (
                      <>
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        Sending link...
                      </>
                    ) : (
                      <>
                        <MailIcon className="mr-2 h-4 w-4" />
                        Send Sign-In Link   
                      </>
                    )}
                  </Button>
                  {!isSubmitted && (<div className="px-8 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-primary hover:underline"
                    >
                      Sign-up now
                    </Link>
                  </div>)}
                </CardFooter>
              </form>
            ) : (
              <CardContent className="space-y-4 mt-8">
                <div className="text-center">
                  <MailCheckIcon className="mx-auto h-12 w-12 text-gray-500" />
                  <p className="mt-2 text-xl font-semibold">Check your email</p>
                  <p className="mt-2 text-sm">
                    We&apos;ve sent a sign-in link to <strong>{email}</strong>. Click the link in the email to access your account.
                    <Button
                    className="w-full mt-5" onClick={() => router.push("/")}>Go Home</Button>
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
      {/* <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="mb-2 text-lg font-semibold">Do you need help?</p>
          <Button variant="outline" onClick={() => router.push("/support")}>
            <HelpCircleIcon className="mr-2 h-4 w-4" />
            Contact Support
          </Button>
        </div>
      </div> */}
      </div>
    </>
  )
}

