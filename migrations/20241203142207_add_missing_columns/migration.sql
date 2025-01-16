/*
  Warnings:

  - The values [USER] on the enum `OrganizationRole` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `description` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `picture` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrganizationRole_new" AS ENUM ('MEMBER', 'ADMIN');
ALTER TABLE "OrganizationUser" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "OrganizationUser" ALTER COLUMN "role" TYPE "OrganizationRole_new" USING ("role"::text::"OrganizationRole_new");
ALTER TYPE "OrganizationRole" RENAME TO "OrganizationRole_old";
ALTER TYPE "OrganizationRole_new" RENAME TO "OrganizationRole";
DROP TYPE "OrganizationRole_old";
ALTER TABLE "OrganizationUser" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrganizationUser" ALTER COLUMN "role" SET DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT;
