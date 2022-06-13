import { Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { RootModule } from './root/root.module'

@Module({
  imports: [RootModule],
  providers: [PrismaService],
})
export class AppModule {}
