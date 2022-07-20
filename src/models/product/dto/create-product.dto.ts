import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  denomination: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  category_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  tax_id: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  part_number?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  reorder_point?: number;
}
