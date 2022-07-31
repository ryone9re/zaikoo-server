import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '@prisma/client';

export class GetMenuDto implements Menu {
  @ApiProperty()
  id: number;

  @ApiProperty()
  request_product_id: number;

  @ApiProperty()
  required_product_id: number;

  @ApiProperty()
  required_number: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
