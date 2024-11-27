/*
  Warnings:

  - You are about to drop the column `middleName` on the `User` table. All the data in the column will be lost.
  - Added the required column `country_code` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_prefix` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "middleName",
ADD COLUMN     "country_code" CHAR(2) NOT NULL,
ADD COLUMN     "investingExperience" "Investing_Experience",
ADD COLUMN     "investingReason" "Investing_Reason",
ADD COLUMN     "phone_number" VARCHAR(20) NOT NULL,
ADD COLUMN     "phone_prefix" VARCHAR(10) NOT NULL;
