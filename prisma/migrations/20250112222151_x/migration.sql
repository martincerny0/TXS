/*
  Warnings:

  - You are about to drop the column `amount` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Trade` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "amount",
DROP COLUMN "price",
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "quantity" DECIMAL(10,2) NOT NULL DEFAULT 0.1;
