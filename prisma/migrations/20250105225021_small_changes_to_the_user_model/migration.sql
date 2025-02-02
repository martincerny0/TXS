/*
  Warnings:

  - Added the required column `countryAbbrev` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNum` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `dateOfBirth` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "countryAbbrev" VARCHAR(3) NOT NULL,
ADD COLUMN     "phoneNum" VARCHAR(18) NOT NULL,
ALTER COLUMN "dateOfBirth" SET NOT NULL;
