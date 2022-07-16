import { Module } from '@nestjs/common';

import { PrismaService } from '../../../libs/prisma/prisma.service';

import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';

@Module({
  controllers: [SupplierController],
  providers: [SupplierService, PrismaService],
})
export class SupplierModule {}
