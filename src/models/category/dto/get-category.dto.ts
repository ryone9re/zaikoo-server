import { ApiProperty } from '@nestjs/swagger';
import { Child_category, Parent_category } from '@prisma/client';

export class GetChildCategoryDto implements Child_category {
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

export class GetParentCategoryDto implements Parent_category {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class GetCategoryDto extends GetChildCategoryDto {}
