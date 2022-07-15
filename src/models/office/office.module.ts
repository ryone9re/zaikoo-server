import { Module } from '@nestjs/common';

import { BaseModule } from './base/base.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [SupplierModule, BaseModule],
})
export class OfficeModule {}
