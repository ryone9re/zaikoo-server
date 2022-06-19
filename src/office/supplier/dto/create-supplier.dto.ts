import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  supplier_name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(7, 7)
  postal_code: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(0, 15)
  phone_number: string;

  @IsString()
  division_name?: string;

  @IsString()
  responsible_name?: string;
}
