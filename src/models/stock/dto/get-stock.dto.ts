import { ApiProperty } from '@nestjs/swagger';
import { Stock } from '@prisma/client';

export class GetStockDto implements Stock {
  @ApiProperty()
  id: number;

  @ApiProperty()
  product_id: number;

  @ApiProperty()
  supplier_id: number;

  @ApiProperty()
  stock_quantity: number;

  @ApiProperty()
  purchase_unit_price: number;

  @ApiProperty()
  selling_unit_price: number;

  @ApiProperty()
  delivery_note_number: string;

  @ApiProperty()
  detail: string;

  @ApiProperty()
  base_id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
