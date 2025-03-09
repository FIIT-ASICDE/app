-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "hideMembers" BOOLEAN;

-- AlterTable
ALTER TABLE "OrganizationUserInvitation" ADD COLUMN     "resolvedAt" TIMESTAMP(3);
