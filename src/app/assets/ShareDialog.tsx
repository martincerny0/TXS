"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import AssetCard from "../_components/Asset/Asset_Card/Asset_Card";
import { api } from "@/trpc/react";
import type { Asset } from "@/types/asset";
import AssetCardSkeleton from "../_components/Asset/Asset_Card/Asset_Card_Skeleton";
import type { User } from "next-auth";

interface ShareDialogProps {
  isSharedAssetModalOpen: boolean;
  setIsSharedAssetDialogOpen: (isOpen: boolean) => void;
  router: AppRouterInstance;
  isRedirecting: boolean;
  setIsRedirecting: (isRedirecting: boolean) => void;
  assetSymbol: string;
  user: User | undefined;
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  isSharedAssetModalOpen,
  setIsSharedAssetDialogOpen,
  router,
  isRedirecting,
  setIsRedirecting,
  assetSymbol,
  user,
}) => {
  const [sharedAsset, setSharedAsset] = useState<Asset | null>(null);

  // fetch the asset
  const { data: fetchedAsset, isLoading } = api.asset.getAssetBySymbol.useQuery(
    {
      symbol: assetSymbol.toUpperCase(),
    },
  );

  // set the asset on fetch
  useEffect(() => {
    if (fetchedAsset) {
      setSharedAsset(fetchedAsset);
    }
  }, [fetchedAsset]);

  return (
    <Dialog
      open={isSharedAssetModalOpen}
      onOpenChange={setIsSharedAssetDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asset Shared with You!</DialogTitle>
          <DialogDescription className="flex items-center">
            You have been shared an asset. Click on
            <PlusCircle className="mx-1 h-5 w-5" />
            to open it in a new chart.
          </DialogDescription>
        </DialogHeader>
        {isLoading || sharedAsset === null ? (
          <AssetCardSkeleton />
        ) : (
          <AssetCard
          user={user}
            asset={sharedAsset}
            router={router}
            isDisabled={isRedirecting}
            setIsDisabled={setIsRedirecting}
          />
        )}
        <DialogFooter className="mt-5 sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSharedAssetDialogOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ShareDialog;
