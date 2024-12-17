/*
  Warnings:

  - You are about to drop the column `crimesId` on the `arma` table. All the data in the column will be lost.
  - You are about to drop the column `armasId` on the `crime` table. All the data in the column will be lost.
  - Added the required column `crimeId` to the `arma` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "crime" DROP CONSTRAINT "crime_armasId_fkey";

-- DropIndex
DROP INDEX "arma_crimesId_key";

-- DropIndex
DROP INDEX "crime_armasId_key";

-- AlterTable
ALTER TABLE "arma" DROP COLUMN "crimesId",
ADD COLUMN     "crimeId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "crime" DROP COLUMN "armasId";

-- AlterTable
ALTER TABLE "criminoso" ALTER COLUMN "cpf" SET DATA TYPE VARCHAR(11);

-- AddForeignKey
ALTER TABLE "arma" ADD CONSTRAINT "arma_crimeId_fkey" FOREIGN KEY ("crimeId") REFERENCES "crime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
