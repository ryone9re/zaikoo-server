import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body()
    createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async findAll() {
    return this.categoryService.findCategoryAll();
  }

  @Get('parent')
  async findParentAll() {
    return this.categoryService.findParentAll();
  }

  @Get('parent/:id')
  async findParentById(@Param('id') id: string) {
    return this.categoryService.findParent({ id: +id });
  }

  @Delete('parent/:id')
  async removeParent(@Param('id') id: string) {
    return this.categoryService.removeParent(+id);
  }

  @Get('child')
  async findChildAll() {
    return this.categoryService.findChildAll();
  }

  @Get('child/:id')
  async findChildById(@Param('id') id: string) {
    return this.categoryService.findChild({ id: +id });
  }

  @Patch('child/:id')
  async updateChild(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoryService.updateChild(+id, body);
  }

  @Delete('child/:id')
  async removeChild(@Param('id') id: string) {
    return this.categoryService.removeChild(+id);
  }
}
