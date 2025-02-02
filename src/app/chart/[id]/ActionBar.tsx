"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Share2, Camera, Copy} from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import type { ChartTimeFrame, Chart } from "@/types/chart";
import { api } from "@/trpc/react";
import type { Asset } from "@/types/asset";
import { timeframes } from "@/types/chart";




interface ActionBarProps {
  selectedChart: Chart;
  setSelectedChart: (chart: Chart) => void;
  changeSelectedAsset: (assetId: number) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ selectedChart, setSelectedChart, changeSelectedAsset}) => {
  
  const { data: assetsData } = api.asset.getAllAssets.useQuery();

  useEffect(() => {
    if (assetsData) {
      setAssets(assetsData);
      setFilteredAssets(assetsData);
    }
  }, [assetsData]);

  const [assets, setAssets] = useState<Asset[]>([]);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(assets);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // get url from env
  const url = process.env.NEXT_PUBLIC_URL;


  // filter assets
  const filterAssets = (e : string) => {
    setSearchTerm(e);
    setFilteredAssets(assets.filter((asset) =>
      asset.symbol.toLowerCase().includes(e.toLowerCase()) || (asset.name.toLowerCase().includes(e.toLowerCase()))
    ));
  } 

  // screenshot the page
  const takeScreenshot = () => {
    console.log("Taking screenshot");
  };
  
  const handleShare = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "x":
        shareUrl = `https://twitter.com/intent/tweet?text=Hey, open ${selectedChart.asset.symbol} in TXS Chart!+ https://my-txs.cz/assets?share=${selectedChart.asset.symbol}`;
        break;

      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=Hey, open ${selectedChart.asset.symbol} in TXS Chart!+  https://my-txs.cz/assets?share=${selectedChart.asset.symbol}`;
        break;
    }

    window.open(shareUrl, "_blank");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${url}/assets?share=${selectedChart.asset.symbol}`);
    toast({
      title: "Link copied!",
      description: "The link has been copied to your clipboard.",
    });
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <Dialog open={isAssetModalOpen} onOpenChange={setIsAssetModalOpen}>
          <DialogTrigger>
            <Button variant="outline">
              {selectedChart.asset.name}
              <Search className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Search Assets</DialogTitle>
              <DialogDescription>
                Enter the symbol or name of the asset you want to view.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="asset-search"
                  placeholder="Search assets..."
                  className="col-span-4"
                  value={searchTerm}
                  onChange={(e) => filterAssets(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-2 min-h-80 max-h-96 overflow-y-scroll">
                {filteredAssets.map((asset) => (
                  <Button
                  
                    key={asset.symbol}
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      setIsAssetModalOpen(false);
                      changeSelectedAsset(asset.id);
                    }}
                  >
                    <Image
                      src={`/image/asset/${asset.symbol.toLowerCase()}.webp`}
                      alt={asset.name}
                      width={20}
                      height={20}
                      className="mr-2 rounded-full"
                    />
                    <span>
                      {asset.symbol} - {asset.name}
                    </span>
                    <span className="text-muted-foreground text-xs justify-end w-full flex">
                      {asset.category}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Select
          value={selectedChart.selectedTimeframe}
          onValueChange={(value: ChartTimeFrame) =>
            setSelectedChart({ ...selectedChart, selectedTimeframe: value })
          }
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            {timeframes.map((frame) => (
              <SelectItem key={frame} value={frame}>
                {frame}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" size="sm" onClick={takeScreenshot}>
                <Camera className="mr-2 h-4 w-4" />
                Snapshot
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Take a Snapshot</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Dialog
                open={isShareModalOpen}
                onOpenChange={setIsShareModalOpen}
              >
                <DialogTrigger>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share this asset</DialogTitle>
                    <DialogDescription>
                      Choose how you want to share this asset
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 flex flex-col space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input value={`${url}/assets?share=${selectedChart.asset.symbol}`} readOnly />
                      <Button  variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                    <Button variant="outline" onClick={() => handleShare("x")}>
                      <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 0 L80 100 L20 200 H50 L100 130 L150 200 H180 L120 100 L180 0 H150 L100 70 L50 0 H20 Z" fill="none" stroke="black" stroke-width="10"/>
                        </svg>

                      Share on X
                    </Button>
                    <Button
                  
                      variant="outline"
                      onClick={() => handleShare("whatsapp")}
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Share on WhatsApp
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ActionBar;
