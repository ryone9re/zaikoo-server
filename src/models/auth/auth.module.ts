import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { FirebaseModule } from './../../libs/firebase/firebase.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthStrategy } from './firebase.strategy';

@Module({
  imports: [FirebaseModule, PassportModule],
  providers: [FirebaseAuthStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
