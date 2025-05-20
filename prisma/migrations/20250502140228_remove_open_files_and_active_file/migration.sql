/*
  Warnings:

  - You are about to drop the column `activeFile` on the `EditorSession` table. All the data in the column will be lost.
  - You are about to drop the column `openFiles` on the `EditorSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EditorSession" DROP COLUMN "activeFile",
DROP COLUMN "openFiles",
ADD COLUMN     "editors" JSONB;
