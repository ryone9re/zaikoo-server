import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateTaxRateDto } from './dto/create-tax-rate.dto';
import { UpdateTaxRateDto } from './dto/update-tax-rate.dto';
import { TaxRatesService } from './tax-rates.service';

@Controller('tax-rates')
export class TaxRatesController {
  constructor(private readonly taxRatesService: TaxRatesService) {}

  @Post()
  create(@Body() createTaxRateDto: CreateTaxRateDto) {
    return this.taxRatesService.create(createTaxRateDto);
  }

  @Get()
  findAll() {
    return this.taxRatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxRatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxRateDto: UpdateTaxRateDto) {
    return this.taxRatesService.update(+id, updateTaxRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxRatesService.remove(+id);
  }
}
