"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Logo from '../_components/Logo/Logo'
import { Separator } from "@/components/ui/separator"
import Footer from '../_components/Footer/Footer'

const terms = [
    { title: "Acceptance of Terms", content: "By accessing or using the TXS platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services." },
    { title: "Contact Us", content: "If you have any questions about these Terms of Service, please contact us at support@txs.com." },
  ];
export default function TermsOfService() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* nav */}
      <header className="flex h-14 items-center justify-between px-4 lg:px-6">
        <Logo height={50} width={50} className="mt-5" />
        <nav className="flex flex-1 justify-center">
          <ul className="flex space-x-4 sm:space-x-6 ml-24">
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
        <Button variant="outline" className="m-2">
          Sign In
        </Button>
        <Button variant="default" className="m-2">
          Sign Up
        </Button>
      </header>
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* main container */}
          <Card className="mx-auto max-w-4xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* iterate terms */}
                {terms.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-xl font-semibold">
                        {/* term count  */}
                        {index + 1}.
                        </div>
                      <h2 className="text-xl font-semibold">
                        {/* term title  */}
                        {section?.title}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {/* term content */}
                      {section.content}
                    </p>
                    {/* the divding line of each policy */}
                    {index < terms.length - 1 && <Separator />}
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



