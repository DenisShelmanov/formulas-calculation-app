/*
  Warnings:

  - You are about to drop the column `result` on the `Variable` table. All the data in the column will be lost.
  - Added the required column `value` to the `Variable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Variable" DROP COLUMN "result",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "isResulted" SET DEFAULT false;
