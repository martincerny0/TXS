"use client"

import React from 'react'
import AdCard from '../_components/Ad_Card/Ad_Card'
import SecondaryNav from '../_components/Secondary_Nav/Secondary_Nav'
import Footer from '../_components/Footer/Footer'
import SocialSection from './SocialSection'
import FinancialSection from './FinancialSection'
import HeaderSection from './HeaderSection'

export default function AccountPage() {

  const isSubscribed = false

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <SecondaryNav />
      <div className="mx-auto max-w-7xl lg:py-20">
        <HeaderSection />
        <AdCard isSubscribed={isSubscribed} />
        <div className="grid gap-8 md:grid-cols-2">
          <FinancialSection />
          <SocialSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

