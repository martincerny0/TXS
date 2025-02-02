/*
  Warnings:

  - You are about to drop the column `countryAbbrev` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country_code` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNum` on the `User` table. All the data in the column will be lost.
  - Added the required column `country_abbrev` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "countryAbbrev",
DROP COLUMN "country_code",
DROP COLUMN "phoneNum",
ADD COLUMN     "country_abbrev" CHAR(2) NOT NULL;
