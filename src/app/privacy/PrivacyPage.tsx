
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Footer from '../_components/Footer/Footer'
import SecondaryNav from '../_components/Secondary_Nav/Secondary_Nav'

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
    <SecondaryNav/>
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

