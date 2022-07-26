import { Module } from '@nestjs/common';

import { PrismaService } from '../../../libs/prisma/prisma.service';

import { AuthModule } from './../../../guard/auth/auth.module';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';

@Module({
  imports: [AuthModule],
  controllers: [SupplierController],
  providers: [SupplierService, PrismaService],
})
export class SupplierModule {}
