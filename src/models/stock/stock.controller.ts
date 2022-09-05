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
import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockService } from './stock.service';

@ApiTags('stock')
// @ApiOAuth2(['all:all'])
@ApiBearerAuth()
@Controller('/api/stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: GetStockDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  // @Post('fromMenu')
  // @UseGuards(AuthGuard)
  // @ApiCreatedResponse({ type: GetStockDto })
  // @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  // async createFromMenu(@Body() createStockDto: CreateStockDto) {
  //   return this.stockService.createStockFromMenu(createStockDto);
  // }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetStockDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetStockDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetStockDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async update(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetStockDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
