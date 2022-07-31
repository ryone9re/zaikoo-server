import { ApiProperty } from '@nestjs/swagger';
import { Child_category } from '@prisma/client';

export class GetCategoryDto implements Child_category {
  @ApiProperty()
  id: number;

  @ApiProperty()
  parent_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
