import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { OfficeModule } from './office/office.module';
import { ProductModule } from './product/product.module';
import { TaxRatesModule } from './tax-rates/tax-rates.module';

@Module({
  imports: [ProductModule, CategoryModule, TaxRatesModule, OfficeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
