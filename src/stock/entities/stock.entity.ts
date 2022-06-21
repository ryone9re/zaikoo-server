import { Stock as StockType } from '@prisma/client';

export class Stock implements StockType {
  id: number;
  product_id: number;
  supplier_id: number;
  stock_quantity: number;
  purchase_unit_price: number;
  selling_unit_price: number | null;
  base_id: number;
  created_at: Date;
  updated_at: Date;
}
