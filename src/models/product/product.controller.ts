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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthGuard } from './../../guard/auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto, GetProductNameListDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@ApiTags('product')
// @ApiOAuth2(['all:all'])
@ApiBearerAuth()
@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: GetProductDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetProductDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetProductDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Get('name')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetProductNameListDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findAllByName() {
    return this.productService.findAllByName();
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetProductDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetProductDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
