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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  GetCategoryDto,
  GetParentCategoryDto,
  GetChildCategoryDto,
} from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
// @ApiOAuth2(['all:all'])
@ApiBearerAuth()
@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: GetCategoryDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async create(
    @Body()
    createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetCategoryDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findAll() {
    return this.categoryService.findCategoryAll();
  }

  @Get('parent')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetParentCategoryDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findParentAll() {
    return this.categoryService.findParentAll();
  }

  @Get('parent/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetParentCategoryDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findParentById(@Param('id') id: string) {
    return this.categoryService.findParent({ id: +id });
  }

  @Delete('parent/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetParentCategoryDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async removeParent(@Param('id') id: string) {
    return this.categoryService.removeParent(+id);
  }

  @Get('child')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetChildCategoryDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findChildAll() {
    return this.categoryService.findChildAll();
  }

  @Get('child/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetChildCategoryDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findChildById(@Param('id') id: string) {
    return this.categoryService.findChild({ id: +id });
  }

  @Patch('child/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetChildCategoryDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async updateChild(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoryService.updateChild(+id, body);
  }

  @Delete('child/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetChildCategoryDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async removeChild(@Param('id') id: string) {
    return this.categoryService.removeChild(+id);
  }
}
