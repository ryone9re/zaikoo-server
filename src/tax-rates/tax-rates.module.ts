import { Module } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { TaxRatesController } from './tax-rates.controller';
import { TaxRatesService } from './tax-rates.service';

@Module({
  controllers: [TaxRatesController],
  providers: [TaxRatesService, PrismaService],
})
export class TaxRatesModule {}
