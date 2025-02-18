/*
  Warnings:

  - The values [USER] on the enum `OrganizationRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrganizationRole_new" AS ENUM ('MEMBER', 'ADMIN');
ALTER TABLE "OrganizationUser" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "OrganizationUser" ALTER COLUMN "role" TYPE "OrganizationRole_new" USING ("role"::text::"OrganizationRole_new");
ALTER TABLE "OrganizationUserInvitation" ALTER COLUMN "role" TYPE "OrganizationRole_new" USING ("role"::text::"OrganizationRole_new");
ALTER TYPE "OrganizationRole" RENAME TO "OrganizationRole_old";
ALTER TYPE "OrganizationRole_new" RENAME TO "OrganizationRole";
DROP TYPE "OrganizationRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "OrganizationUser" ALTER COLUMN "role" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OrganizationUserInvitation" ALTER COLUMN "role" SET DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT;
