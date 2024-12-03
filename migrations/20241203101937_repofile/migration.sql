-- CreateTable
CREATE TABLE "RepoFile" (
    "id" TEXT NOT NULL,
    "file" UUID NOT NULL,

    CONSTRAINT "RepoFile_pkey" PRIMARY KEY ("file")
);
