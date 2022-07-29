import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSeriviceName() {
    return { serviceName: 'WFC Warehouse Manager' };
  }
}
