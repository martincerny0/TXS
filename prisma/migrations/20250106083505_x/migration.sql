/*
  Warnings:

  - Added the required column `paintingsColor` to the `Chart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textsColor` to the `Chart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trendlinesColor` to the `Chart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chart" ADD COLUMN     "paintingsColor" VARCHAR(7) NOT NULL,
ADD COLUMN     "textsColor" VARCHAR(7) NOT NULL,
ADD COLUMN     "trendlinesColor" VARCHAR(7) NOT NULL,
ALTER COLUMN "paintings" DROP NOT NULL,
ALTER COLUMN "trendlines" DROP NOT NULL,
ALTER COLUMN "texts" DROP NOT NULL;
