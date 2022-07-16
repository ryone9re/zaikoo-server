import { Injectable } from '@nestjs/common';

import { SignupBody } from './dto/signup-body.dto';

import { FirebaseService } from 'src/libs/firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async login(userId: string) {
    return {
      userId: userId,
    };
  }

  async signup(param: { signup: SignupBody }) {
    return param;
  }
}
