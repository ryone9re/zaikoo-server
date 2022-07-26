import { Module } from '@nestjs/common';

import { PrismaService } from '../../libs/prisma/prisma.service';

import { AuthModule } from './../../guard/auth/auth.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
export class CategoryModule {}
