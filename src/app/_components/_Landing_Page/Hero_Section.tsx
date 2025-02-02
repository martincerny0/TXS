"use client";
import React, { useEffect, useState } from "react";
import {
  TrendingUpIcon,
  BrainCircuitIcon,
  UsersIcon,
  SearchIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CandlestickBackground from "../Background/Candlestick_Background/Candlestick_Background";
import { Input } from "@/components/ui/input";
import RedirectButton from "../Redirect/Redirect_Button/Redirect_Button";
import type { Asset } from "@/types/asset";
import AssetLogo from "../Asset/Asset_Logo/Asset_Logo";
import { api } from "@/trpc/react";
import type { StaticAsset } from "@/types/asset";



interface AssetSmallCardProps {
  asset: StaticAsset;
}

const AssetSmallCard: React.FC<AssetSmallCardProps> = ({ asset }) => {
  const dailyChange =  (((asset.price - asset.priceAtStartOfDay) / asset.priceAtStartOfDay) * 100);

  return (
    <Button
      variant="outline"
      size="lg"
      className="flex items-center space-x-2 rounded-full"
    >
      <AssetLogo assetSymbol={asset.symbol} height={24} width={24} />
      <span>{asset.symbol}</span>
      <span className={`flex items-center ${dailyChange > 0 ? "text-green-500" : "text-red-500"}`}>
        {dailyChange > 0 ? <ArrowUpIcon className="mr-1 h-4 w-4" /> : (
        <ArrowDownIcon className="mr-1 h-4 w-4" />
        )}
       {dailyChange.toFixed(1)}%
      </span>
    </Button>
  );
};

const HeroSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Asset[]>([]);
  const [topAssets, setTopAssets] = useState<StaticAsset[]>([]);

  // data fetching
  const { data : assetData, isLoading} = api.asset.getAssetBySearchTerm.useQuery({searchTerm});
  const { data : topAssetsData, isLoading: topAssetsLoading} = api.asset.getTopAssets.useQuery({quantity: 3});

  useEffect(() => {
    if(assetData){
      setSearchResults(assetData);
    }
  }, [assetData]);

  useEffect(() => {
    if(topAssetsData){
      setTopAssets(topAssetsData);
    }
  }, [topAssetsData]);

  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-gradient-to-b from-white to-gray-100 py-12 md:py-24 lg:py-32 xl:py-48">
      <CandlestickBackground />
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tighter text-transparent sm:text-4xl md:text-5xl lg:text-6xl/none">
              Trade, Exchange & Share
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500">
              Join a platform where trading, socializing, and sharing your
              winnings come together seamlessly.
            </p>
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <RedirectButton
              href="/signup"
              size="lg"
              className="transform rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            >
              Get Started
            </RedirectButton>
            <RedirectButton href="/about" variant="outline" size="lg">
              Learn More
            </RedirectButton>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm">
              <TrendingUpIcon className="mr-1 h-4 w-4" />
              Real-time Trading
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <BrainCircuitIcon className="mr-1 h-4 w-4" />
              AI Assistant
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <UsersIcon className="mr-1 h-4 w-4" />
              Social Community
            </Badge>
          </div>

          <div className="w-full max-w-md">
            <div className="relative mt-8 backdrop-blur">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="search"
                placeholder="Search markets"
                className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {topAssets.filter((asset) => asset.id !== undefined).map((asset) => (
                <AssetSmallCard key={asset.id} asset={asset} />
              ))}
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
