import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
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

  @IsOptional()
  @IsNumberString()
  @Length(0, 15)
  phone_number?: string;

  @IsOptional()
  @IsEmail()
  email_address?: string;

  @IsOptional()
  @IsString()
  division_name?: string;

  @IsOptional()
  @IsString()
  responsible_name?: string;
}
