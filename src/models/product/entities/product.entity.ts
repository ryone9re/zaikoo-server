import { Product as ProductType } from '@prisma/client';

export class Product implements ProductType {
  id: number;
  denomination: string;
  name: string;
  description: string | null;
  part_number: string | null;
  reorder_point: number | null;
  memo: string | null;
  category1_id: number;
  category2_id: number | null;
  tax_id: number;
  created_at: Date;
  updated_at: Date;
}
