import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  parent: Prisma.Parent_categoryWhereUniqueInput;

  @IsNotEmpty()
  @IsString()
  name: string;
}
