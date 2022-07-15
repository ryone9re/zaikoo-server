import { Global, Module } from '@nestjs/common';

import { FirebaseService } from './firebasee.service';

@Global()
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
