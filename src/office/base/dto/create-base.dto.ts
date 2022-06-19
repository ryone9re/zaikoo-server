import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateBaseDto {
  @IsNotEmpty()
  base_name: string;

  @IsNotEmpty()
  @Length(7, 7)
  postal_code: string;

  @IsNotEmpty()
  address: string;

  @Length(0, 15)
  phone_number?: string;

  @IsEmail()
  email_address?: string;

  division_name?: string;

  responsible_name?: string;
}
