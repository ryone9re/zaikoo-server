import { Module } from '@nestjs/common';

import { PrismaService } from '../../libs/prisma/prisma.service';

import { AuthModule } from './../../guard/auth/auth.module';
import { TaxRatesController } from './tax-rates.controller';
import { TaxRatesService } from './tax-rates.service';

@Module({
  imports: [AuthModule],
  controllers: [TaxRatesController],
  providers: [TaxRatesService, PrismaService],
})
export class TaxRatesModule {}
