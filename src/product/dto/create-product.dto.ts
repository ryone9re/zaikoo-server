import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
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

  @IsString()
  description?: string;

  @IsNumberString()
  @IsPositive()
  part_number?: number;

  @IsNumber()
  @IsPositive()
  reorder_point?: number;
}
