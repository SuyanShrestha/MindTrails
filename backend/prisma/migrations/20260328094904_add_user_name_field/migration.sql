-- AlterTable
ALTER TABLE "GameQuestion" ADD COLUMN     "outsider" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "GameQuestionAnswer" ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "isCorrect" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;
