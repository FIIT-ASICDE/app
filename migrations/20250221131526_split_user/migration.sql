/*
  Warnings:

  - You are about to drop the column `userId` on the `OrganizationUser` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `OrganizationUserInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `RepoUserOrganization` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `RepoFile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userMetadataId,organizationId]` on the table `OrganizationUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userMetadataId,organizationId]` on the table `OrganizationUserInvitation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userMetadataId,repoId]` on the table `RepoUserOrganization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userMetadataId` to the `OrganizationUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userMetadataId` to the `OrganizationUserInvitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userMetadataId` to the `RepoUserOrganization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrganizationUser" DROP CONSTRAINT "OrganizationUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationUserInvitation" DROP CONSTRAINT "OrganizationUserInvitation_userId_fkey";

-- DropForeignKey
ALTER TABLE "RepoUserOrganization" DROP CONSTRAINT "RepoUserOrganization_userId_fkey";

-- DropIndex
DROP INDEX "OrganizationUser_userId_organizationId_key";

-- DropIndex
DROP INDEX "OrganizationUserInvitation_userId_organizationId_key";

-- DropIndex
DROP INDEX "RepoUserOrganization_userId_repoId_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "OrganizationUser" DROP COLUMN "userId",
ADD COLUMN     "userMetadataId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "OrganizationUserInvitation" DROP COLUMN "userId",
ADD COLUMN     "userMetadataId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "RepoUserOrganization" DROP COLUMN "userId",
ADD COLUMN     "userMetadataId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "role",
DROP COLUMN "surname",
DROP COLUMN "username",
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- DropTable
DROP TABLE "RepoFile";

-- CreateTable
CREATE TABLE "UserMetadata" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "bio" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "userId" UUID NOT NULL,

    CONSTRAINT "UserMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserMetadata_userId_key" ON "UserMetadata"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUser_userMetadataId_organizationId_key" ON "OrganizationUser"("userMetadataId", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUserInvitation_userMetadataId_organizationId_key" ON "OrganizationUserInvitation"("userMetadataId", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "RepoUserOrganization_userMetadataId_repoId_key" ON "RepoUserOrganization"("userMetadataId", "repoId");

-- AddForeignKey
ALTER TABLE "OrganizationUser" ADD CONSTRAINT "OrganizationUser_userMetadataId_fkey" FOREIGN KEY ("userMetadataId") REFERENCES "UserMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUserInvitation" ADD CONSTRAINT "OrganizationUserInvitation_userMetadataId_fkey" FOREIGN KEY ("userMetadataId") REFERENCES "UserMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepoUserOrganization" ADD CONSTRAINT "RepoUserOrganization_userMetadataId_fkey" FOREIGN KEY ("userMetadataId") REFERENCES "UserMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMetadata" ADD CONSTRAINT "UserMetadata_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
