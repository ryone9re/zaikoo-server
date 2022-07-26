import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class Parent implements Prisma.Parent_categoryWhereUniqueInput {
  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional()
  name?: string;
}

export class CreateCategoryDto {
  @ApiProperty({ type: Parent })
  parent: Parent;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
