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
  part_number: string;

  @ApiProperty()
  reorder_point: number;

  @ApiProperty()
  memo: string;

  @ApiProperty()
  category1_id: number;

  @ApiProperty()
  category2_id: number;

  @ApiProperty()
  tax_id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class GetProductNameListDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
