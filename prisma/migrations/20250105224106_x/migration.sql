/*
  Warnings:

  - You are about to drop the column `indicators` on the `Chart` table. All the data in the column will be lost.
  - You are about to drop the column `premium` on the `Insight` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chart" DROP COLUMN "indicators";

-- AlterTable
ALTER TABLE "Insight" DROP COLUMN "premium",
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "active",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "profileImage",
ADD COLUMN     "bio" VARCHAR(100),
ADD COLUMN     "isTradeNotification" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" VARCHAR(50) NOT NULL;
