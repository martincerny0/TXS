import React from "react";
import { PlayCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const DemoSection : React.FC = () => {
    return (
      <section className="flex w-full justify-center bg-white py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Unlock Your Potential with TXS
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Experience a powerful suite of tools that allows you to easily
                track market trends, analyze real-time data, and make informed
                financial decisions. With an intuitive and seamless platform,
                TXS empowers you to optimize your strategies and stay ahead in
                the market.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="inline-flex items-center justify-center">
                  <PlayCircleIcon className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl border bg-gray-100">
              <video
                className="h-full w-full object-cover"
                poster="/placeholder.svg?height=720&width=1280"
                src="/placeholder.mp4"
              >
                <source src="/placeholder.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>
    );
}

export default DemoSection;