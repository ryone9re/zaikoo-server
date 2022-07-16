import { Body, Controller, Request, UseGuards } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { SignupBody } from './dto/signup-body.dto';
import { FirebaseAuthDecodedUser, StrategyName } from './firebase.strategy';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard(StrategyName))
  @Post('/signup')
  async signup(@Body() body: SignupBody) {
    return this.authService.signup({ signup: body });
  }

  @UseGuards(AuthGuard(StrategyName))
  @Post('/login')
  async login(@Request() req: { user: FirebaseAuthDecodedUser }) {
    const userId = req.user.uid;
    return this.authService.login(userId);
  }
}
