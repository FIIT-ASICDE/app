/*
  Warnings:

  - The values [MAINTAINER] on the enum `RepoRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `favorite` on the `Repo` table. All the data in the column will be lost.
  - Added the required column `favorite` to the `RepoUserOrganization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RepoRole_new" AS ENUM ('ADMIN', 'CONTRIBUTOR', 'VIEWER', 'OWNER');
ALTER TABLE "RepoUserOrganization" ALTER COLUMN "repoRole" DROP DEFAULT;
ALTER TABLE "RepoUserOrganization" ALTER COLUMN "repoRole" TYPE "RepoRole_new" USING ("repoRole"::text::"RepoRole_new");
ALTER TYPE "RepoRole" RENAME TO "RepoRole_old";
ALTER TYPE "RepoRole_new" RENAME TO "RepoRole";
DROP TYPE "RepoRole_old";
ALTER TABLE "RepoUserOrganization" ALTER COLUMN "repoRole" SET DEFAULT 'OWNER';
COMMIT;

-- AlterTable
ALTER TABLE "Repo" DROP COLUMN "favorite";

-- AlterTable
ALTER TABLE "RepoUserOrganization" ADD COLUMN     "favorite" BOOLEAN NOT NULL,
ALTER COLUMN "repoRole" SET DEFAULT 'OWNER';
