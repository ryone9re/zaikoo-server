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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './../../guard/auth/auth.guard';
import { CreateMenuDto } from './dto/create-menu.dto';
import { GetMenuDto } from './dto/get-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';

@ApiTags('menu')
@Controller('/api/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetMenuDto })
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetMenuDto] })
  async findAll() {
    return this.menuService.findMenuAll();
  }

  @Get(':request_product_id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetMenuDto })
  async findMenu(@Param('request_product_id') request_product_id: number) {
    return this.menuService.findMenu(request_product_id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetMenuDto })
  async findOne(@Param('id') id: string) {
    return this.menuService.findMenuOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetMenuDto })
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetMenuDto })
  async remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
