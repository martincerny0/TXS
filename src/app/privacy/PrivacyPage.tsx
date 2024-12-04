
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Logo from '../_components/Logo/Logo'
import { Separator } from "@/components/ui/separator"
import Footer from '../_components/Footer/Footer'
import RedirectButton from '../_components/Redirect_Button/Redirect_Button'

const terms = [
    { title: "Information We Collect", content: "We collect various types of information from our users to provide and improve our services:", list : [
      "Personal Information: Such as your name, email address, and phone number when you create an account.",
      "Financial Information: Including investment preferences, portfolio data, and transaction history.",
      "Social Interaction Data: Information you share in posts, comments, and messages on our platform.",
      "Usage Data: Information on how you interact with our platform, including log data and device information.",
    ]},
  ];
export default function PrivacyPolicy() {

  return (
    <div className="flex min-h-screen flex-col">
      {/* nav */}
      <header className="flex h-14 items-center justify-between px-4 lg:px-6">
        <Logo height={50} width={50} className="mt-5" />
        <nav className="flex flex-1 justify-center">
          <ul className="ml-24 flex space-x-4 sm:space-x-6">
            <li>
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href="/"
              >
                Home
              </Link>
            </li>
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
                href="/insights"
              >
                Insights
              </Link>
            </li>
          </ul>
        </nav>
        {/* sign in / up buttons */}
        <RedirectButton href='/signin' variant="outline" className="m-2">
          Sign In
        </RedirectButton>
        <RedirectButton href='/signup' variant="default" className="m-2">
          Sign Up
        </RedirectButton>
      </header>
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* main container */}
          <Card className="mx-auto max-w-4xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* iterate policies */}
                {terms.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-xl font-semibold">
                        {/* policy count  */}
                        {index + 1}.
                      </div>
                      <h2 className="text-xl font-semibold">
                        {/* policy title  */}
                        {section?.title}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {/* policy content */}
                      {section.content}
                    </p>
                    {section.list && (
                      <ul className="list-disc pl-6 text-sm text-gray-600">
                        {section.list.map((item, i) => (
                          <li key={i} className="mb-2 text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {/* the divding line of each policy */}
                    {index < terms.length - 1 && <Separator/>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

