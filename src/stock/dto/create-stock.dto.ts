import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  supplier_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock_quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  purchase_unit_price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  base_id: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  selling_unit_price?: number;
}
