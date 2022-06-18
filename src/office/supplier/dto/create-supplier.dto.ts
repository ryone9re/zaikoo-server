export class CreateSupplierDto {
  supplier_name: string;
  postal_code: string;
  address: string;
  email_address: string;
  phone_number: string;
  division_name?: string;
  responsible_name?: string;
}
