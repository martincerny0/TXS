import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface ChartCardSkeletonProps {
  className?: string;
}

const ChartCardSkeleton: React.FC<ChartCardSkeletonProps> = ({ className }) => {
  return (
    <Card className={`w-1/6 cursor-pointer hover:border-slate-50 hover:bg-slate-50 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex">
          <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300"></div>
          <div>
            <p className="ml-2 mt-2 h-4 w-10 animate-pulse bg-gray-300 text-sm"></p>
            <p className="ml-2 mt-2 h-2 w-14 animate-pulse bg-gray-300 text-sm"></p>

          </div>
        </div>
        <div className="ml-2 mt-2 h-5 w-5 rounded-lg animate-pulse bg-gray-300"></div>
      </CardHeader>
      <CardContent>
      <p className="mt-1 h-2 w-24 animate-pulse bg-gray-300 text-sm"></p>
      </CardContent>
    </Card>
  );
};

export default ChartCardSkeleton;
