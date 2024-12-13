"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Footer from "../_components/Footer/Footer";
import SecondaryNav from "../_components/Secondary_Nav/Secondary_Nav";

const terms = [
  {
    "title": "Acceptance of Terms",
    "content": "By accessing or using the TXS platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services."
  },
  {
    "title": "User Eligibility",
    "content": "You must be at least 18 years old to use the TXS platform. We require identity verification, including a valid government-issued ID, to create an account."
  },
  {
    "title": "User Accounts",
    "content": "To access certain features, you must create an account with accurate and current information. You are responsible for maintaining the security of your account and all activities under it."
  },
  {
    "title": "Subscriptions",
    "content": "TXS offers both free and paid subscriptions. Paid subscriptions are billed monthly and are non-refundable."
  },
  {
    "title": "Prohibited Activities",
    "content": "You may not use the TXS platform to engage in harassment, bullying, spreading fake information, or any other prohibited social activities, including but not limited to hate speech, spam, or pornography."
  },
  {
    "title": "User-Generated Content",
    "content": "You are responsible for the content you post on TXS. Content involving harassment, bullying, fake information, pornography, or other violations of these terms is strictly prohibited."
  },
  {
    "title": "Content Moderation",
    "content": "We reserve the right to review, moderate, and remove any user-generated content that violates these Terms of Service."
  },
  {
    "title": "Privacy Policy",
    "content": "We collect personal data such as your name, date of birth, email, country of origin, phone number, and ID number. Please refer to our Privacy Policy for details on how we use and protect your data."
  },
  {
    "title": "Limitation of Liability",
    "content": "TXS is not responsible for any loss of invested money or for any false information shared by other users on the platform."
  },
  {
    "title": "Governing Law",
    "content": "These Terms of Service are governed by the laws of the United States."
  },
  {
    "title": "Dispute Resolution",
    "content": "Any disputes arising out of or related to these Terms of Service will be resolved through binding arbitration."
  },
  {
    "title": "Changes to Terms",
    "content": "We reserve the right to update or modify these Terms of Service at any time. Continued use of the platform after changes indicates acceptance of the new terms."
  },
  {
    "title": "Contact Us",
    "content": "If you have any questions about these Terms of Service, please contact us at support@txs.com."
  }
];



export default function TermsOfService() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* nav */}
      <SecondaryNav />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* main container */}
          <Card className="mx-auto max-w-4xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* iterate terms */}
                {terms.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-xl font-semibold">{index + 1}.</div>
                      <h2 className="text-xl font-semibold">{section?.title}</h2>
                    </div>
                    <p className="text-sm text-gray-500">{section.content}</p>
                    {/* the dividing line of each policy */}
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
