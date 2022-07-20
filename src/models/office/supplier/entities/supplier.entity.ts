import { Supplier as SupplierType } from '@prisma/client';

export class Supplier implements SupplierType {
  id: number;
  supplier_name: string;
  postal_code: string;
  address: string;
  email_address: string;
  phone_number: string;
  division_name: string | null;
  responsible_name: string | null;
  created_at: Date;
  updated_at: Date;
}
