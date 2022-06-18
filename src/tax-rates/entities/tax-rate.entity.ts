import { Tax_rate } from '@prisma/client';

export class TaxRate implements Tax_rate {
  id: number;
  rate: number;
  created_at: Date;
  updated_at: Date;
}
