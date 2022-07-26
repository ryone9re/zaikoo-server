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

import { AuthGuard } from './../../guard/auth/auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body()
    createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return this.categoryService.findCategoryAll();
  }

  @Get('parent')
  @UseGuards(AuthGuard)
  async findParentAll() {
    return this.categoryService.findParentAll();
  }

  @Get('parent/:id')
  @UseGuards(AuthGuard)
  async findParentById(@Param('id') id: string) {
    return this.categoryService.findParent({ id: +id });
  }

  @Delete('parent/:id')
  @UseGuards(AuthGuard)
  async removeParent(@Param('id') id: string) {
    return this.categoryService.removeParent(+id);
  }

  @Get('child')
  @UseGuards(AuthGuard)
  async findChildAll() {
    return this.categoryService.findChildAll();
  }

  @Get('child/:id')
  @UseGuards(AuthGuard)
  async findChildById(@Param('id') id: string) {
    return this.categoryService.findChild({ id: +id });
  }

  @Patch('child/:id')
  @UseGuards(AuthGuard)
  async updateChild(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoryService.updateChild(+id, body);
  }

  @Delete('child/:id')
  @UseGuards(AuthGuard)
  async removeChild(@Param('id') id: string) {
    return this.categoryService.removeChild(+id);
  }
}
