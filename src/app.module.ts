import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  exports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
