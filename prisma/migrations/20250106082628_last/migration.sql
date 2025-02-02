/*
  Warnings:

  - Added the required column `assetId` to the `Chart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chart" ADD COLUMN     "assetId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
