"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Footer from '../_components/Footer/Footer'
import SecondaryNav from '../_components/Secondary_Nav/Secondary_Nav'

const terms = [
    { title: "Acceptance of Terms", content: "By accessing or using the TXS platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services." },
    { title: "Contact Us", content: "If you have any questions about these Terms of Service, please contact us at support@txs.com." },
  ];
export default function TermsOfService() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* nav */}
      <SecondaryNav/>
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



