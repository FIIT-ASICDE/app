/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `senderMetadataId` to the `OrganizationUserInvitation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrganizationUserInvitation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "senderMetadataId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE INDEX "OrganizationUserInvitation_senderMetadataId_idx" ON "OrganizationUserInvitation"("senderMetadataId");

-- CreateIndex
CREATE INDEX "OrganizationUserInvitation_organizationId_idx" ON "OrganizationUserInvitation"("organizationId");

-- RenameForeignKey
ALTER TABLE "OrganizationUserInvitation" RENAME CONSTRAINT "OrganizationUserInvitation_organizationId_fkey" TO "fk_invitation_organization";

-- RenameForeignKey
ALTER TABLE "OrganizationUserInvitation" RENAME CONSTRAINT "OrganizationUserInvitation_userMetadataId_fkey" TO "fk_invitation_user";

-- AddForeignKey
ALTER TABLE "OrganizationUserInvitation" ADD CONSTRAINT "fk_invitation_sender" FOREIGN KEY ("senderMetadataId") REFERENCES "UserMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
