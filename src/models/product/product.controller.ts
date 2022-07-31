import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './../../guard/auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: GetProductDto })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetProductDto] })
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetProductDto })
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetProductDto })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetProductDto })
  async remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
