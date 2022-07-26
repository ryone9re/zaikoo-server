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
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';

@Controller('/api/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.menuService.findMenuAll();
  }

  @Get(':request_product_id')
  @UseGuards(AuthGuard)
  findMenu(@Param('request_product_id') request_product_id: number) {
    return this.menuService.findMenu(request_product_id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.menuService.findMenuOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
