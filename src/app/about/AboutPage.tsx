import Footer from "../_components/Footer/Footer";
import SecondaryNav from "../_components/Secondary_Nav/Secondary_Nav";
import CandlestickBackground from "../_components/Candlestick_Background/Candlestick_Background";
import { Card, CardContent, CardHeader} from "@/components/ui/card"

import { ChartCandlestick, Sparkles, Users, Newspaper, ChartPie, BadgeDollarSign } from "lucide-react";

const features = [
  {
    icon: ChartCandlestick,
    title: "Advanced Trading",
    description:
      "Stay ahead in the market with sophisticated trading tools that help you make informed decisions.",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    description:
      "Powered by ChatGPT-4, our AI tool helps you with trading strategy. Get in-depth portfolio analysis, predictive insights, and more!",
  },
  {
    icon: Users,
    title: "Social Trading",
    description:
      "Connect with other traders, share strategies, discuss market trends and learn from the community.",
  },
  {
    icon: Newspaper,
    title: "Insights",
    description:
      "Stay updated with latest market news and trends, access premium insights with our subscription plans.",
  },
  {
    icon: ChartPie,
    title: "Portfolio",
    description:
      "Manage your investments, track your performance or analyze your winnings and losses.",
  },
  {
    icon: BadgeDollarSign,
    title: "Assets",
    description:
      "Chose from wide range of assets, including stocks, crypto and indexes. Explore new investment opportunities.",
  },
];

export default function About() {

    return (
      <div>
        <SecondaryNav />
        <section className="relative flex w-full justify-center overflow-hidden bg-gradient-to-b from-white to-gray-100 py-24">
          <CandlestickBackground />
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-5xl font-bold tracking-tighter text-transparent">
            Learn About TXS
          </h1>
        </section>
        {/* features */}
        <section className="flex w-full justify-center bg-white py-12">
          <div className="container px-4">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter">
              Our Features
            </h2>
            <div className="ml-48 grid w-3/4 grid-cols-3 items-center gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                    <p className="text-sm text-gray-500">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <div className="lg:mt-64">
        <Footer />
        </div>
      </div>
    );
}
