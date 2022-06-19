import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class CreateBaseDto {
  @IsNotEmpty()
  @IsString()
  base_name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(7, 7)
  postal_code: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNumberString()
  @Length(0, 15)
  phone_number?: string;

  @IsEmail()
  email_address?: string;

  @IsString()
  division_name?: string;

  @IsString()
  responsible_name?: string;
}
