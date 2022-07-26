import { Module } from '@nestjs/common';

import { PrismaService } from '../../libs/prisma/prisma.service';

import { AuthModule } from './../../guard/auth/auth.module';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [AuthModule],
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
})
export class MenuModule {}
