import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './guard/auth/auth.module';
import { AuthService } from './guard/auth/auth.service';
import { CategoryModule } from './models/category/category.module';
import { MenuModule } from './models/menu/menu.module';
import { OfficeModule } from './models/office/office.module';
import { ProductModule } from './models/product/product.module';
import { StockModule } from './models/stock/stock.module';
import { TaxRatesModule } from './models/tax-rates/tax-rates.module';

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
