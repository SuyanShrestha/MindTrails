/*
  Warnings:

  - The `report` column on the `ProgressReport` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProgressReport" DROP COLUMN "report",
ADD COLUMN     "report" JSONB;
