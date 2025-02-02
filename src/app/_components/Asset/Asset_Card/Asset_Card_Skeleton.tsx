import React from "react";
import { Card } from "@/components/ui/card";

interface AssetCardSkeletonProps {
  className?: string;
}

const AssetCardSkeleton: React.FC<AssetCardSkeletonProps> = ({ className }) => {
  return (
    <Card
      className={`flex items-center space-x-4 p-2 transition-transform hover:scale-105 ${className}`}
    >
      <div className="ml-2 h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
      <div className="flex-grow">
        <p className="h-4 w-8 animate-pulse bg-gray-300 font-bold"></p>
        <p className="mt-2 h-3 w-12 animate-pulse bg-gray-300 text-sm"></p>
      </div>
      <div className="flex-grow">
        <div className="flex items-center">
          <div className="h-4 w-16 animate-pulse bg-gray-300"></div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="h-4 w-4 mr-4 animate-pulse rounded-full bg-gray-300"></div>
      </div>
    </Card>
  );
};

export default AssetCardSkeleton;
