import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../libs/prisma/prisma.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id: id } });
  }

  async findAllByName() {
    return this.prisma.product.findMany({
      select: { id: true, name: true, description: true },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const data: Prisma.ProductUpdateInput = {
      denomination: updateProductDto.denomination,
      name: updateProductDto.name,
      description: updateProductDto.description,
      part_number: updateProductDto.part_number,
      reorder_point: updateProductDto.reorder_point,
    };
    if (updateProductDto.category1_id) {
      data.category1 = { update: { id: updateProductDto.category1_id } };
    }
    if (updateProductDto.category2_id) {
      data.category2 = { update: { id: updateProductDto.category2_id } };
    }
    if (updateProductDto.tax_id) {
      data.tax = { update: { id: updateProductDto.tax_id } };
    }
    return this.prisma.product.update({
      where: { id: id },
      data: data,
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({ where: { id: id } });
  }
}
