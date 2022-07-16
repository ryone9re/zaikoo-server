import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../libs/prisma/prisma.service';

import { CreateTaxRateDto } from './dto/create-tax-rate.dto';
import { UpdateTaxRateDto } from './dto/update-tax-rate.dto';

@Injectable()
export class TaxRatesService {
  constructor(private prisma: PrismaService) {}

  async create(createTaxRateDto: CreateTaxRateDto) {
    return this.prisma.tax_rate.create({ data: createTaxRateDto });
  }

  async findAll() {
    return this.prisma.tax_rate.findMany();
  }

  async findOne(id: number) {
    return this.prisma.tax_rate.findUnique({ where: { id: id } });
  }

  async update(id: number, updateTaxRateDto: UpdateTaxRateDto) {
    return this.prisma.tax_rate.update({
      where: { id: id },
      data: updateTaxRateDto,
    });
  }

  async remove(id: number) {
    return this.prisma.tax_rate.delete({ where: { id: id } });
  }
}
