import { IsEmail, Length } from 'class-validator';

export class CreateSupplierDto {
  supplier_name: string;

  @Length(7, 7)
  postal_code: string;

  address: string;

  @IsEmail()
  email_address: string;

  @Length(0, 15)
  phone_number: string;

  division_name?: string;

  responsible_name?: string;
}
