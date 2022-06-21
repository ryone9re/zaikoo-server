import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateStockFromMenuDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock_quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  base_id: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  supplier_id?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  purchase_unit_price?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  selling_unit_price?: number;
}
