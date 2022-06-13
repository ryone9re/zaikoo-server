import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSeriviceName(): string {
    return 'WFC Warehouse Manager';
  }
}
