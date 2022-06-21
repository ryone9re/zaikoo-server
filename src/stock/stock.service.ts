import { Injectable } from '@nestjs/common';

import { MenuService } from './../menu/menu.service';
import { PrismaService } from './../prisma.service';
import { CreateStockFromMenuDto } from './dto/create-stock-from-menu.dto';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(
    private prisma: PrismaService,
    private menuService: MenuService,
  ) {}

  async create(createStockDto: CreateStockDto) {
    return this.prisma.stock.create({ data: createStockDto });
  }

  async findAll() {
    return this.prisma.stock.findMany();
  }

  async findProductInBase(product_id: number, base_id: number) {
    return this.prisma.stock.findMany({
      where: { product_id: product_id, base_id: base_id },
    });
  }

  async findOne(id: number) {
    return this.prisma.stock.findUnique({ where: { id: id } });
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    return this.prisma.stock.update({
      where: { id: id },
      data: updateStockDto,
    });
  }

  async remove(id: number) {
    return this.prisma.stock.delete({ where: { id: id } });
  }
}
