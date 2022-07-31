import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class GetProductDto implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  denomination: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  part_number: number;

  @ApiProperty()
  reorder_point: number;

  @ApiProperty()
  category_id: number;

  @ApiProperty()
  tax_id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
