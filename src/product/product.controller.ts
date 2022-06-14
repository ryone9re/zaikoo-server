import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() body: Prisma.ProductCreateInput) {
    return this.productService.create(body);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Prisma.ProductUpdateInput) {
    return this.productService.update({
      where: { id: Number(id) },
      data: body,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove({ id: Number(id) });
  }
}
