import React from "react";
import type { Asset } from "@/types/asset";
import AssetCard from "@/app/_components/Asset_Card/Asset_Card";

const mockAssets: [Asset, Asset, Asset, Asset] = [
  { id: 1, name: "Bitcoin", symbol: "BTC", category: "crypto", price: 187.54 },
  { id: 2, name: "Ethereum", symbol: "ETH", category: "crypto", price: 187.54 },
  { id: 3, name: "Litecoin", symbol: "LTC", category: "crypto", price: 0 },
  { id: 4, name: "Apple Inc", symbol: "AAPL", category: "stock", price: 187.54 },
];

const OtherAssets: React.FC = () => {
  return (
    <div className="border-t border-gray-200 bg-white p-4 px-20 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold">Other Assets</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mockAssets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default OtherAssets;
