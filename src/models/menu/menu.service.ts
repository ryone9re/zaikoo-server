import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../libs/prisma/prisma.service';

import { CreateStockDto } from './../stock/dto/create-stock.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async createMenu(createMenuDto: CreateMenuDto) {
    const data = createMenuDto.requires.map((v) => {
      return {
        request_product_id: createMenuDto.request_product_id,
        required_product_id: v.required_product_id,
        required_number: v.required_number,
      };
    });
    return this.prisma.menu.createMany({ data: data });
  }

  async findMenuAll() {
    return this.prisma.menu.findMany();
  }

  async findMenu(request_product_id: number) {
    return this.prisma.menu.findMany({
      where: { request_product: { id: request_product_id } },
      orderBy: {
        updated_at: 'asc',
      },
    });
  }

  async findMenuInBaseWithStock(createStockDto: CreateStockDto) {
    return this.prisma.menu.findMany({
      where: {
        request_product_id: createStockDto.product_id,
      },
      include: {
        required_product: {
          include: {
            stock: {
              where: {
                base_id: createStockDto.base_id,
              },
              orderBy: {
                updated_at: 'asc',
              },
            },
          },
        },
      },
    });
  }

  async findMenuOne(id: number) {
    return this.prisma.menu.findUnique({ where: { id: id } });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({ where: { id: id }, data: updateMenuDto });
  }

  async remove(id: number) {
    return this.prisma.menu.delete({ where: { id: id } });
  }
}
