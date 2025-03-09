/*
  Warnings:

  - You are about to drop the column `isPending` on the `OrganizationUserInvitation` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- AlterTable
ALTER TABLE "OrganizationUserInvitation" DROP COLUMN "isPending",
ADD COLUMN     "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "RepoUserInvitation" (
    "userMetadataId" UUID NOT NULL,
    "senderMetadataId" UUID NOT NULL,
    "repoId" UUID NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "role" "RepoRole" NOT NULL DEFAULT 'CONTRIBUTOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RepoUserInvitation_pkey" PRIMARY KEY ("userMetadataId","repoId")
);

-- CreateIndex
CREATE INDEX "RepoUserInvitation_senderMetadataId_idx" ON "RepoUserInvitation"("senderMetadataId");

-- CreateIndex
CREATE INDEX "RepoUserInvitation_repoId_idx" ON "RepoUserInvitation"("repoId");

-- RenameForeignKey
ALTER TABLE "OrganizationUserInvitation" RENAME CONSTRAINT "fk_invitation_sender" TO "fk_invitation_sender_org";

-- RenameForeignKey
ALTER TABLE "OrganizationUserInvitation" RENAME CONSTRAINT "fk_invitation_user" TO "fk_invitation_user_org";

-- AddForeignKey
ALTER TABLE "RepoUserInvitation" ADD CONSTRAINT "fk_invitation_user_repo" FOREIGN KEY ("userMetadataId") REFERENCES "UserMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepoUserInvitation" ADD CONSTRAINT "fk_invitation_sender_repo" FOREIGN KEY ("senderMetadataId") REFERENCES "UserMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepoUserInvitation" ADD CONSTRAINT "fk_invitation_repo" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepoUserInvitation" ADD CONSTRAINT "RepoUserInvitation_userMetadataId_fkey" FOREIGN KEY ("userMetadataId") REFERENCES "UserMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
