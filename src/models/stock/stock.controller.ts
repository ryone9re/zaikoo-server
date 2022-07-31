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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './../../guard/auth/auth.guard';
import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockService } from './stock.service';

@ApiTags('stock')
@Controller('/api/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ type: GetStockDto })
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @Post('fromMenu')
  @UseGuards(AuthGuard)
  @ApiResponse({ type: GetStockDto })
  createFromMenu(@Body() createStockDto: CreateStockDto) {
    return this.stockService.createStockFromMenu(createStockDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ type: [GetStockDto] })
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ type: GetStockDto })
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ type: GetStockDto })
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ type: GetStockDto })
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
