import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Asset } from "@/types/asset";
import {
  TrendingDown, TrendingUp
} from "lucide-react";
interface AssetCardProps {
  asset: Asset;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  const getYesterDayPrice = (asset: Asset) => {
    // api call!!!
    return 100;
  }

  const getDailyChange = (asset: Asset) => {
    return getYesterDayPrice(asset) - asset.price!;
  }

  const [assetDailyPriceChange, setAssetDailyPriceChange] = useState<number>(getDailyChange(asset));




  return (
    <Card key={asset.symbol} className="flex items-center space-x-4 p-2 hover:scale-105 transition-transform">
      <Image
        src={`/image/asset/${asset.symbol}.webp`}
        alt={asset.name}
        width={28}
        height={28}
        className="rounded-full ml-2"
      />
      <div className="flex-grow">
        <h4 className="font-bold">{asset.symbol}</h4>
        <p className="text-sm text-gray-500">{asset.name}</p>
      </div>
      <div className="flex-grow">
        <p className={`flex text-sm text-gray-500 font-bold ${assetDailyPriceChange < 0 ? "text-red-600" : "text-green-600"}`}>{assetDailyPriceChange.toFixed(2)} {assetDailyPriceChange < 0 ? <TrendingDown className="h-6 w-6 ml-2"/> : <TrendingUp className="h-6 w-6 ml-2" />}</p>
      </div>
    </Card>
  );
};

export default AssetCard;
