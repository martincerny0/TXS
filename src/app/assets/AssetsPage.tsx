"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, PlusCircle, Info, Plus, Lock } from "lucide-react";
import ServerNav from "../_components/MainElements/Main_Nav/MainNav";
import { api } from "@/trpc/react";
import type { Chart } from "@/types/chart";
import type { Asset } from "@/types/asset";
import { useRouter, useSearchParams } from "next/navigation";
import AssetCardSkeleton from "../_components/Asset/Asset_Card/Asset_Card_Skeleton";
import AssetCard from "../_components/Asset/Asset_Card/Asset_Card";
import ChartCard from "../_components/Chart/Chart_Card/Chart_Card";
import ChartCardSkeleton from "../_components/Chart/Chart_Card/Chart_Card_Skeleton";
import type { AssetCategory } from "@/types/asset";
import ShareDialog from "./ShareDialog";
import type { User } from "next-auth";

interface ChartPageProps {
  user: User | undefined;
}
const AssetsPage: React.FC<ChartPageProps> = ({ user }) => {
  const router = useRouter();

  const sharedAsset  = useSearchParams().get("share");
  const [isSharedAssetModalOpen, setIsSharedAssetDialogOpen] =
    useState<boolean>(true);

  const [charts, setCharts] = useState<Chart[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // searching states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<AssetCategory | "All">(
    "All",
  );

  // fetching data
  const { data: chartsData, isLoading: isChartsLoading } =
    api.chart.getUserCharts.useQuery();
  const {
    data: assetsData,
    isLoading: isAssetsLoading,
    refetch,
  } = api.asset.getAssetBySearchTerm.useQuery({
    searchTerm,
    category: categoryFilter,
  });

  // set charts on fetch
  useEffect(() => {
    if (chartsData) {
      setCharts(chartsData);
    }
  }, [chartsData]);

  // set the assets on fetch
  useEffect(() => {
    if (assetsData) {
      setAssets(assetsData);
    }
  }, [assetsData]);

  // refetch the assets when term or category changes...
  useEffect(() => {
    const refetchFilteredData = async () => {
      await refetch();
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetchFilteredData();
  }, [searchTerm, categoryFilter, refetch]);

  const changeCategoryFilter = (value: string) => {
    setCategoryFilter(value as AssetCategory | "All");
  };

  return (
    <div className="container mx-auto overflow-y-hidden px-4">
      <ServerNav user={user} />
      <main className="mt-20 space-y-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold">Saved Charts</h2>
        </CardHeader>
        <CardContent>
          <div className="flex justify-start space-x-4 pb-4">
            {isChartsLoading && user
              ? Array.from({ length: 3 }).map((_, index) => (
                  <ChartCardSkeleton key={index} />
                ))
              : charts.map((chart) => (
                  <ChartCard
                    key={chart.id}
                    chart={chart}
                    router={router}
                    isDisabled={isLoading}
                    setIsDisabled={setIsLoading}
                  />
                ))}
            <Card
              className={`w-1/12 cursor-pointer hover:border-slate-50 hover:bg-slate-50 ${isLoading && "opacity-70"} ${!user && "w-1/6"}`}
            >
              <CardContent
                className={`flex h-full items-center justify-center ${!user && "mt-4 flex-col items-start justify-start"}`}
              >
                {user ? (
                  <Plus className="mt-5 h-14 w-14 text-muted-foreground" />
                ) : (
                  <>
                    <Lock className="h-6 w-6 text-muted-foreground" />
                    <div className="mt-4 flex w-full items-center">
                      <p className="text-sm text-muted-foreground">
                        You need to be signed in to create a chart.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <div className="flex justify-center rounded-md border border-border bg-muted p-3">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-muted-foreground" />
            <p className="flex text-sm text-muted-foreground">
              Select assets and click
              <PlusCircle className="mx-1 h-5 w-5" />
              to open them in a new chart.
            </p>
          </div>
        </div>
        <CardHeader>
          <h2 className="text-lg font-semibold">Assets</h2>
          <div className="mt-2 flex space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets"
                disabled={isAssetsLoading || isLoading}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={categoryFilter}
              onValueChange={changeCategoryFilter}
              disabled={isAssetsLoading || isLoading}
            >
              <SelectTrigger className="w-2/4 md:w-1/6">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Stock">Stocks</SelectItem>
                <SelectItem value="Crypto">Crypto</SelectItem>
                <SelectItem value="ETF">ETFs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {assets.length === 0 && !isAssetsLoading ? (
            <>
              <div className="flex h-40 w-full flex-col items-center justify-center">
                <p className="text-muted-foreground">No assets found</p>
                <Button
                  variant="default"
                  size="sm"
                  className="mt-5"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {isAssetsLoading 
                  ? Array.from({ length: 8 }).map((_, index) => (
                      <AssetCardSkeleton key={index} />
                    ))
                  : assets.map((asset) => (
                      <AssetCard
                        key={asset.id}
                        user={user}
                        asset={asset}
                        router={router}
                        isDisabled={isLoading}
                        setIsDisabled={setIsLoading}
                      />
                    ))}
              </div>
            </>
          )}
        </CardContent>
        {sharedAsset && (
          <ShareDialog
          user={user}
            assetSymbol={sharedAsset}
            isRedirecting={isLoading}
            setIsRedirecting={setIsLoading}
            isSharedAssetModalOpen={isSharedAssetModalOpen}
            setIsSharedAssetDialogOpen={setIsSharedAssetDialogOpen}
            router={router}
          />
        )}
      </main>
    </div>
  );
};

export default AssetsPage;
