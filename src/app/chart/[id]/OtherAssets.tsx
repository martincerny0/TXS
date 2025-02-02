"use client";
import React, { useEffect } from "react";
import type { Asset, AssetCategory } from "@/types/asset";
import AssetCard from "@/app/_components/Asset/Asset_Card/Asset_Card";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import AssetCardSkeleton from "@/app/_components/Asset/Asset_Card/Asset_Card_Skeleton";
import type { User } from "next-auth";

interface OtherAssetsProps {
  assetCategory: AssetCategory;
  AssetId: number;
  user: User | undefined;
}

const OtherAssets: React.FC<OtherAssetsProps> = ({assetCategory, AssetId, user}) => {

  const router = useRouter();
  const { data : assetsData, isLoading } = api.asset.getAssetsByCategory.useQuery({ assetCategory: assetCategory , quantity: 4, selectedAssetId : AssetId });
  const [assets, setAssets] = React.useState<Asset[]>();

  useEffect(() => {
    if (assetsData) {
      setAssets(assetsData);
    }
  }, [assetsData]);
  return (
    <div className="border-t border-gray-200 bg-white p-4 px-20 dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold">Other Assets</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          Array.from({length: 3 }).map((_, index) => <AssetCardSkeleton key={index} />)
        ) : (
          assets?.map((asset) => <AssetCard key={asset.id} user={user} asset={asset} router={router} />)
        )
        }
      </div>
    </div>
  );
};

export default OtherAssets;
