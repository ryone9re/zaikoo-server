import { Module } from '@nestjs/common';

import { PrismaService } from '../../../libs/prisma/prisma.service';

import { BaseController } from './base.controller';
import { BaseService } from './base.service';

@Module({
  controllers: [BaseController],
  providers: [BaseService, PrismaService],
})
export class BaseModule {}
