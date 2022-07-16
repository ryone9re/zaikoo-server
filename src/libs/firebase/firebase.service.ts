import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import serviceAccount from '../../../firebase-service-account.json';

@Injectable()
export class FirebaseService {
  private firebaseApp: firebase.app.App;

  constructor() {
    if (firebase.app.length === 0) {
      this.firebaseApp = firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount as ServiceAccount),
      });
    }
  }

  getAuth = (): firebase.auth.Auth => {
    return this.firebaseApp.auth();
  };
}
