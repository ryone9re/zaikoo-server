import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import admin from 'firebase-admin';

import * as serviceAccount from '../../../firebase-service-account.json';

const firebaseParams = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

admin.initializeApp(firebaseParams);

@Injectable()
export class AuthService {
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
