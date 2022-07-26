import { Module } from '@nestjs/common';

import { PrismaService } from '../../../libs/prisma/prisma.service';

import { AuthModule } from './../../../guard/auth/auth.module';
import { BaseController } from './base.controller';
import { BaseService } from './base.service';

@Module({
  imports: [AuthModule],
  controllers: [BaseController],
  providers: [BaseService, PrismaService],
})
export class BaseModule {}
