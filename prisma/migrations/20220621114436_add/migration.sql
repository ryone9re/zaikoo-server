/*
  Warnings:

  - Made the column `base_id` on table `Stock` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_base_id_fkey";

-- AlterTable
ALTER TABLE "Stock" ALTER COLUMN "base_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "Base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
