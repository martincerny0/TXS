/*
  Warnings:

  - Added the required column `tag` to the `Insight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Insight" ADD COLUMN     "tag" "InsightsTag" NOT NULL;
