import { Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';

import { AuthLoginService } from './auth-login.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authLoginService: AuthLoginService) {}

  @Post()
  async login() {
    const dummyUserId = 'foobar';
    return this.authLoginService.login(dummyUserId);
  }
}
