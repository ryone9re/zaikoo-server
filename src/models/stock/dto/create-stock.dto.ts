import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateStockDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  supplier_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock_quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  purchase_unit_price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  base_id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  selling_unit_price?: number;
}
