-- CreateEnum
CREATE TYPE "ProgressReportStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "ProgressReport" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameSessionId" TEXT NOT NULL,
    "status" "ProgressReportStatus" NOT NULL DEFAULT 'PENDING',
    "report" TEXT,
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgressReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgressReport_gameSessionId_key" ON "ProgressReport"("gameSessionId");

-- CreateIndex
CREATE INDEX "ProgressReport_userId_createdAt_idx" ON "ProgressReport"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "ProgressReport_status_idx" ON "ProgressReport"("status");

-- AddForeignKey
ALTER TABLE "ProgressReport" ADD CONSTRAINT "ProgressReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressReport" ADD CONSTRAINT "ProgressReport_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
