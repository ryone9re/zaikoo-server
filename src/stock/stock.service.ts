import { Injectable } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  async create(createStockDto: CreateStockDto) {
    return 'This action adds a new stock';
  }

  async findAll() {
    return `This action returns all stock`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  async remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
