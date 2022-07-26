import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  supplier_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Length(7, 7)
  postal_code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Length(0, 15)
  phone_number: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  division_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  responsible_name?: string;
}
