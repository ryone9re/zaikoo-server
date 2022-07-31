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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  GetCategoryDto,
  GetParentCategoryDto,
  GetChildCategoryDto,
} from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: GetCategoryDto })
  async create(
    @Body()
    createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetCategoryDto] })
  async findAll() {
    return this.categoryService.findCategoryAll();
  }

  @Get('parent')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetParentCategoryDto] })
  async findParentAll() {
    return this.categoryService.findParentAll();
  }

  @Get('parent/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetParentCategoryDto })
  async findParentById(@Param('id') id: string) {
    return this.categoryService.findParent({ id: +id });
  }

  @Delete('parent/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetParentCategoryDto })
  async removeParent(@Param('id') id: string) {
    return this.categoryService.removeParent(+id);
  }

  @Get('child')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetChildCategoryDto] })
  async findChildAll() {
    return this.categoryService.findChildAll();
  }

  @Get('child/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetChildCategoryDto })
  async findChildById(@Param('id') id: string) {
    return this.categoryService.findChild({ id: +id });
  }

  @Patch('child/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetChildCategoryDto })
  async updateChild(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoryService.updateChild(+id, body);
  }

  @Delete('child/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetChildCategoryDto })
  async removeChild(@Param('id') id: string) {
    return this.categoryService.removeChild(+id);
  }
}
