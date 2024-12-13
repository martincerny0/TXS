import Footer from "../_components/Footer/Footer";
import SecondaryNav from "../_components/Secondary_Nav/Secondary_Nav";
import CandlestickBackground from "../_components/Candlestick_Background/Candlestick_Background";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, PenTool, TrendingUp } from "lucide-react";

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
                    <feature.icon className="mb-4 h-12 w-12 text-primary" />
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
        {/* ai assistant */}
        <section className="flex justify-center">
          <div>
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              *****Use our advanced AI assistant!
            </h2>
            <div className="space-y-16">
              <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-16 w-16 text-gray-600" />
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                    Market Prediction
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      AI analyzes historical data and current market conditions
                      to help you make best trading decisions
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <div className="flex-shrink-0">
                  <BarChart2 className="h-16 w-16 text-gray-600" />
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                    Portfolio Analysis
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      AI examines your asset allocation and performance along
                      with personalized recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
              <div className="flex-shrink-0">
                <PenTool className="h-16 w-16 text-gray-600" />
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                  Content Creation
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>AI generates tailored content based on your input</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
}
