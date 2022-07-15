import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { MenuModule } from './menu/menu.module';
import { OfficeModule } from './office/office.module';
import { ProductModule } from './product/product.module';
import { StockModule } from './stock/stock.module';
import { TaxRatesModule } from './tax-rates/tax-rates.module';

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    TaxRatesModule,
    OfficeModule,
    MenuModule,
    StockModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
