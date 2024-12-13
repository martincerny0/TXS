import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Footer from '../_components/Footer/Footer'
import SecondaryNav from '../_components/Secondary_Nav/Secondary_Nav'

const terms = [
  {
    "title": "Introduction",
    "content": "TXS ('we', 'us', or 'our') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use the TXS platform."
  },
  {
    "title": "Information We Collect",
    "content": "We collect various types of information from our users to provide and improve our services:",
    "list": [
      "Personal Information: Such as your name, date of birth, email address, phone number, country of origin, and ID number when you create an account.",
      "Financial Information: Including investment preferences, transaction history, and portfolio data.",
      "Identity Verification Data: Copies of identification documents to verify user eligibility.",
      "Social Interaction Data: Information you share in posts, comments, messages, and interactions on the platform.",
      "Usage Data: Information on how you interact with the platform, including log data, IP address, device type, browser type, and access times."
    ]
  },
  {
    "title": "How We Use Your Information",
    "content": "We use the information we collect for the following purposes:",
    "list": [
      "To verify your identity and eligibility to use the platform.",
      "To provide, operate, and maintain our services.",
      "To process subscriptions and manage billing.",
      "To detect and prevent fraud, harassment, and other violations of our Terms of Service.",
      "To communicate with you regarding your account, updates, and support requests.",
      "To improve our platform and develop new features."
    ]
  },
  {
    "title": "Sharing of Information",
    "content": "We do not sell or rent your personal information. However, we may share your information with:",
    "list": [
      "Service Providers: Third-party services for identity verification, payment processing, and platform maintenance.",
      "Legal Authorities: When required by law or to protect our rights and the safety of others."
    ]
  },
  {
    "title": "Data Security",
    "content": "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is entirely secure."
  },
  {
    "title": "Data Retention",
    "content": "We retain your personal information for 60 days after account termination or as required to comply with legal obligations, resolve disputes, and enforce our agreements."
  },
  {
    "title": "Your Rights",
    "content": "You have the following rights regarding your personal information:",
    "list": [
      "Access and Update: You can access or update your personal information through your account settings.",
      "Delete: You can request the deletion of your personal information.",
      "Object or Restrict Processing: You can object to or restrict the processing of your personal data.",
      "Withdraw Consent: If we process your data based on consent, you may withdraw it at any time."
    ]
  },
  {
    "title": "Cookies and Tracking Technologies",
    "content": "We use cookies and similar tracking technologies to enhance your experience, analyze platform usage, and deliver personalized content. You can manage your cookie preferences in your browser settings."
  },
  {
    "title": "GDPR Compliance",
    "content": "If you are located in the European Economic Area (EEA), we process your personal data in accordance with the General Data Protection Regulation (GDPR). You have the right to access, correct, or delete your data and to lodge a complaint with your local data protection authority."
  },
  {
    "title": "Age Restrictions",
    "content": "You must be at least 18 years old to use the TXS platform. We do not knowingly collect personal information from individuals under 18."
  },
  {
    "title": "Changes to This Privacy Policy",
    "content": "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on our platform."
  },
  {
    "title": "Contact Us",
    "content": "If you have any questions about this Privacy Policy, please contact us at support@txs.com."
  }
]

  
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
                        {/* policy count */}
                        {index + 1}.
                      </div>
                      <h2 className="text-xl font-semibold">
                        {/* policy title */}
                        {section?.title}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-500">
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
                    {/* the dividing line of each policy */}
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
