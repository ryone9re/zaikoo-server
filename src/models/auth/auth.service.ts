import { Injectable } from '@nestjs/common';

import { SignupBody } from './dto/signup-body.dto';

@Injectable()
export class AuthService {
  async login(userId: string) {
    return {
      userId: userId,
    };
  }

  async signup(param: { signup: SignupBody }) {
    return param;
  }
}
