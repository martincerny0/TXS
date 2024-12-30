import React from 'react'
import Footer from './_components/Footer/Footer';
import InsightsSection from './_components/Landing_Page/Insights_Section';
import SocialSection from './_components/Landing_Page/Social_Section';
import PrimaryNav from './_components/Primary_Nav/Primary_Nav';
import HeroSection from './_components/Landing_Page/Hero_Section';
import DemoSection from './_components/Landing_Page/Demo_Section';
import PricingSection from './_components/Landing_Page/Pricing_Section';
import CtaSection from './_components/Landing_Page/Cta_Section';

export default function Index() {

  return (
    <div className="flex flex-col">
      <PrimaryNav />
      <main className="flex-1">
        <HeroSection />
        <DemoSection />
        <PricingSection />
        <InsightsSection />
        <SocialSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}