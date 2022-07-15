import { Base as BaseType } from '@prisma/client';

export class Base implements BaseType {
  id: number;
  base_name: string;
  postal_code: string;
  address: string;
  phone_number: string | null;
  email_address: string | null;
  division_name: string | null;
  responsible_name: string | null;
  created_at: Date;
  updated_at: Date;
}
