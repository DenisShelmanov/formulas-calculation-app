-- CreateEnum
CREATE TYPE "VariableType" AS ENUM ('NUMBER', 'PERSENT', 'CURRENCY');

-- CreateTable
CREATE TABLE "Variable" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" "VariableType" NOT NULL DEFAULT 'NUMBER',
    "result" DOUBLE PRECISION NOT NULL,
    "isResulted" BOOLEAN NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Variable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formula" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Formula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FormulaToVariable" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FormulaToVariable_AB_unique" ON "_FormulaToVariable"("A", "B");

-- CreateIndex
CREATE INDEX "_FormulaToVariable_B_index" ON "_FormulaToVariable"("B");

-- AddForeignKey
ALTER TABLE "_FormulaToVariable" ADD CONSTRAINT "_FormulaToVariable_A_fkey" FOREIGN KEY ("A") REFERENCES "Formula"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FormulaToVariable" ADD CONSTRAINT "_FormulaToVariable_B_fkey" FOREIGN KEY ("B") REFERENCES "Variable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
