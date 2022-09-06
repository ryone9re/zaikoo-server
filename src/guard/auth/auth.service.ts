import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import admin from 'firebase-admin';

const FIREBASE_COOKIE_KEY = '__fortressFirebaseSession';

const firebaseParams = {
  type: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
  projectId: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
  privateKeyId: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
  authUri: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
  tokenUri: process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
  authProviderX509CertUrl:
    process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
};

admin.initializeApp(firebaseParams);

export class CheckAuth {
  @ApiProperty()
  authState: boolean;

  constructor(readonly isAuth: boolean) {
    this.authState = isAuth;
  }
}

@Injectable()
export class AuthService {
  removeBearerKeyword(keyword: string): string {
    const s = keyword.slice(0, 7);
    if (s === 'Bearer ' || s === 'bearer ') return keyword.slice(7);
    else return keyword;
  }

  async validateUser(token: string): Promise<any> {
    if (!token) throw new UnauthorizedException('Unauthorized');

    try {
      const user = await admin.auth().verifyIdToken(token);
      return user;
    } catch (e) {
      throw new HttpException('Forbidden', e);
    }
  }

  async checkAuth(cookies: any) {
    if (!(FIREBASE_COOKIE_KEY in cookies)) {
      return new CheckAuth(false);
    }

    try {
      const user = await admin
        .auth()
        .verifyIdToken(cookies[FIREBASE_COOKIE_KEY]);
      if (user) return new CheckAuth(true);
      return new CheckAuth(false);
    } catch {
      return new CheckAuth(false);
    }
  }
}
