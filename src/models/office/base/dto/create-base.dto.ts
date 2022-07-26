import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateBaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  base_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Length(7, 7)
  postal_code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiPropertyOptional()
  @IsNumberString()
  @Length(0, 15)
  phone_number?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email_address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  division_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  responsible_name?: string;
}
