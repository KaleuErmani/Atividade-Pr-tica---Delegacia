/*
  Warnings:

  - You are about to drop the column `criminososId` on the `arma` table. All the data in the column will be lost.
  - Added the required column `criminosoId` to the `arma` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "arma" DROP CONSTRAINT "arma_criminososId_fkey";

-- AlterTable
ALTER TABLE "arma" DROP COLUMN "criminososId",
ADD COLUMN     "criminosoId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "arma" ADD CONSTRAINT "arma_criminosoId_fkey" FOREIGN KEY ("criminosoId") REFERENCES "criminoso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
