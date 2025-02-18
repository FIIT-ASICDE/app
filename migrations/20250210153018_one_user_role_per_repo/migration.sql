/*
  Warnings:

  - A unique constraint covering the columns `[userId,repoId]` on the table `RepoUserOrganization` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "RepoUserOrganization" DROP CONSTRAINT "RepoUserOrganization_organizationId_fkey";

-- DropIndex
DROP INDEX "RepoUserOrganization_userId_organizationId_repoId_key";

-- AlterTable
ALTER TABLE "RepoUserOrganization" ALTER COLUMN "organizationId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RepoUserOrganization_userId_repoId_key" ON "RepoUserOrganization"("userId", "repoId");

-- AddForeignKey
ALTER TABLE "RepoUserOrganization" ADD CONSTRAINT "RepoUserOrganization_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
