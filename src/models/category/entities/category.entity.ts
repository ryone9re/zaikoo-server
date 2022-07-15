import { Child_category } from '@prisma/client';

export class Category implements Child_category {
  id: number;
  parent_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
