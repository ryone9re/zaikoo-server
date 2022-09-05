import {
  BadRequestException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Stock } from '@prisma/client';

import { PrismaService } from '../../libs/prisma/prisma.service';

import { MenuService } from './../menu/menu.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { DeliverStockDto } from './dto/deliver-stock.dto';
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

  #compareRequiredToStock(required: number, stock: Stock[]) {
    const stock_quantities = stock.map((v) => v.stock_quantity);
    const quantitySummary = stock_quantities.reduce((a, x) => a + x);
    return required >= quantitySummary;
  }

  async #consumeStock(used: number, stock: Stock[]) {
    let i = 0;
    if (used < stock[0].stock_quantity) {
      return this.update(stock[0].id, {
        stock_quantity: stock[0].stock_quantity - used,
      });
    }
    if (used === stock[0].stock_quantity) {
      return this.remove(stock[0].id);
    }
    for (i = 0; 0 < used && used >= stock[i].stock_quantity; i++) {
      used = used - stock[i].stock_quantity;
      try {
        await this.remove(stock[i].id);
      } catch (r) {
        return new Promise(() => {
          throw new BadRequestException('Remove stock error');
        });
      }
    }
    if (used !== 0) {
      return this.update(stock[i].id, {
        stock_quantity: stock[i].stock_quantity - used,
      });
    }
  }

  async createStockFromMenu(createStockDto: CreateStockDto) {
    const menus = await this.menuService.findMenuInBaseWithStock(
      createStockDto,
    );
    if (menus.length === 0) return new BadRequestException('No menu');
    menus.forEach((v) => {
      if (
        !this.#compareRequiredToStock(
          v.required_number,
          v.required_product.stock,
        )
      )
        return new BadRequestException('No stock');
    });
    const created = await this.create(createStockDto);
    // TODO 使った商品を在庫からへらす
    for await (const m of menus) {
      try {
        await this.#consumeStock(m.required_number, m.required_product.stock);
      } catch (e) {
        return new BadRequestException('Stock consume error');
      }
    }
    return created;
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

  async deliverTo(deliverStockDto: DeliverStockDto) {
    try {
      const stock = await this.findOne(deliverStockDto.stock_id);
      if (stock.stock_quantity < deliverStockDto.quantity)
        throw new HttpException(
          '必要な量の在庫がありません',
          HttpStatus.BAD_REQUEST,
        );
      // TODO 出荷DBに登録
      return;
    } catch (e) {
      return e;
    }
  }
}
