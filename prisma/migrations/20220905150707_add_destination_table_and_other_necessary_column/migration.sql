/*
  Warnings:

  - You are about to drop the column `category_id` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category1_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_id_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category_id",
ADD COLUMN     "category1_id" INTEGER NOT NULL,
ADD COLUMN     "category2_id" INTEGER,
ADD COLUMN     "memo" TEXT,
ALTER COLUMN "part_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "delivery_note_number" TEXT,
ADD COLUMN     "detail" TEXT;

-- CreateTable
CREATE TABLE "Destination" (
    "id" SERIAL NOT NULL,
    "base_name" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT,
    "email_address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category1_id_fkey" FOREIGN KEY ("category1_id") REFERENCES "Child_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category2_id_fkey" FOREIGN KEY ("category2_id") REFERENCES "Child_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
