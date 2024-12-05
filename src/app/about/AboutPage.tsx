import Footer from "../_components/Footer/Footer";
import SecondaryNav from "../_components/Secondary_Nav/Secondary_Nav";
import CandlestickBackground from "../_components/Candlestick_Background/Candlestick_Background";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { TrendingUpIcon } from "lucide-react";

const features = [
    { icon: TrendingUpIcon, title: "Advanced Trading", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam eaque beatae non voluptatum nulla magni rem quo voluptatibus vel porro" },
    { icon: TrendingUpIcon, title: "AI Analytics", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam eaque beatae non voluptatum nulla magni rem quo voluptatibus vel porro" },
    { icon: TrendingUpIcon, title: "Social Trading", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam eaque beatae non voluptatum nulla magni rem quo voluptatibus vel porro" },
    { icon: TrendingUpIcon, title: "Insights", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam eaque beatae non voluptatum nulla magni rem quo voluptatibus vel porro" },
    { icon: TrendingUpIcon, title: "Portfolio", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam eaque beatae non voluptatum nulla magni rem quo voluptatibus vel porro" },
    { icon: TrendingUpIcon, title: "Assets", description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam eaque beatae non voluptatum nulla magni rem quo voluptatibus vel porro" },
  ]

export default function About() {

    return (
      <div>
        <SecondaryNav />
        <section className="relative flex w-full justify-center overflow-hidden bg-gradient-to-b from-white to-gray-100 py-24 dark:from-gray-900 dark:to-gray-800">
          <CandlestickBackground />
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-5xl font-bold tracking-tighter text-transparent dark:from-gray-100 dark:to-gray-400">
            Learn About TXS
          </h1>
        </section>
        <section className="bg-white py-12 dark:bg-gray-800 flex justify-center w-full">
          <div className="container px-4">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter">
              Our Features
            </h2>
            <div className="grid grid-cols-3 gap-6 w-3/4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <CardHeader>
                    <feature.icon className="mb-4 h-12 w-12 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
}