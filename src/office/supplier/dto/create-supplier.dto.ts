import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  supplier_name: string;

  @IsNotEmpty()
  @Length(7, 7)
  postal_code: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @IsNotEmpty()
  @Length(0, 15)
  phone_number: string;

  division_name?: string;

  responsible_name?: string;
}
