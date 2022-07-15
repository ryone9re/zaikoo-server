import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthLoginService } from './auth-login.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule],
  providers: [AuthLoginService],
  controllers: [AuthController],
})
export class AuthModule {}
