import { Product as ProductType } from '@prisma/client';

export class Product implements ProductType {
  id: number;
  denomination: string;
  name: string;
  description: string | null;
  part_number: number | null;
  reorder_point: number | null;
  category_id: number;
  tax_id: number;
  created_at: Date;
  updated_at: Date;
}
