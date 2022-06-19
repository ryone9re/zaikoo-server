/*
  Warnings:

  - A unique constraint covering the columns `[request_product_id,required_product_id]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Menu_request_product_id_required_product_id_key" ON "Menu"("request_product_id", "required_product_id");
