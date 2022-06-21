import { Module } from '@nestjs/common';

import { MenuService } from './../menu/menu.service';
import { PrismaService } from './../prisma.service';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  controllers: [StockController],
  providers: [StockService, PrismaService, MenuService],
})
export class StockModule {}
