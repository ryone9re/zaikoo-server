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
import { CreateTaxRateDto } from './dto/create-tax-rate.dto';
import { GetTaxRateDto } from './dto/get-tax-rate.dto';
import { UpdateTaxRateDto } from './dto/update-tax-rate.dto';
import { TaxRatesService } from './tax-rates.service';

@ApiTags('tax-rates')
@Controller('api/tax-rates')
export class TaxRatesController {
  constructor(private readonly taxRatesService: TaxRatesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: GetTaxRateDto })
  async create(@Body() createTaxRateDto: CreateTaxRateDto) {
    return this.taxRatesService.create(createTaxRateDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetTaxRateDto] })
  async findAll() {
    return this.taxRatesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetTaxRateDto })
  async findOne(@Param('id') id: string) {
    return this.taxRatesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetTaxRateDto })
  async update(
    @Param('id') id: string,
    @Body() updateTaxRateDto: UpdateTaxRateDto,
  ) {
    return this.taxRatesService.update(+id, updateTaxRateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetTaxRateDto })
  async remove(@Param('id') id: string) {
    return this.taxRatesService.remove(+id);
  }
}
