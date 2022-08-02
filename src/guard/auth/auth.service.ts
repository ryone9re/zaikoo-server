import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import admin from 'firebase-admin';

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
}
