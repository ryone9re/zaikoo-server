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
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockService } from './stock.service';

@Controller('/api/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Post('fromMenu')
  @UseGuards(AuthGuard)
  createFromMenu(@Body() createStockDto: CreateStockDto) {
    return this.stockService.createStockFromMenu(createStockDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
