/*
  Warnings:

  - Made the column `name` on table `Organization` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "image" TEXT,
ALTER COLUMN "name" SET NOT NULL;
