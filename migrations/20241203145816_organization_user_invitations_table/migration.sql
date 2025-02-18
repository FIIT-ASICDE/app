-- CreateTable
CREATE TABLE "OrganizationUserInvitation" (
    "userId" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "isPending" BOOLEAN NOT NULL DEFAULT true,
    "role" "OrganizationRole" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUserInvitation_userId_organizationId_key" ON "OrganizationUserInvitation"("userId", "organizationId");

-- AddForeignKey
ALTER TABLE "OrganizationUserInvitation" ADD CONSTRAINT "OrganizationUserInvitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUserInvitation" ADD CONSTRAINT "OrganizationUserInvitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
