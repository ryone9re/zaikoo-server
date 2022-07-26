import { Module } from '@nestjs/common';

import { PrismaService } from '../../libs/prisma/prisma.service';

import { AuthModule } from './../../guard/auth/auth.module';
import { MenuService } from './../menu/menu.service';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  imports: [AuthModule],
  controllers: [StockController],
  providers: [StockService, PrismaService, MenuService],
})
export class StockModule {}
