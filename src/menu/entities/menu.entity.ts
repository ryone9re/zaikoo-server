import { Menu as MenuType } from '@prisma/client';

export class Menu implements MenuType {
  id: number;
  request_product_id: number;
  required_product_id: number;
  required_number: number;
  created_at: Date;
  updated_at: Date;
}
