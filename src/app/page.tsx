import React from 'react'
import Footer from './_components/MainElements/Footer/Footer';
import InsightsSection from './_components/_Landing_Page/Insights_Section';
import SocialSection from './_components/_Landing_Page/Social_Section';
import ServerNav from './_components/MainElements/Main_Nav/MainNav';
import HeroSection from './_components/_Landing_Page/Hero_Section';
import DemoSection from './_components/_Landing_Page/Demo_Section';
import PricingSection from './_components/_Landing_Page/Pricing_Section';
import CtaSection from './_components/_Landing_Page/Cta_Section';
import { getServerAuthSession } from '@/server/auth';

export default async function Index() {
  const session = await getServerAuthSession();


  return (
    <div className="flex flex-col">
      <ServerNav user={session?.user} />
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