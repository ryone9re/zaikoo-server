import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ServiceName {
  @ApiProperty()
  serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }
}

@Injectable()
export class AppService {
  getSeriviceName() {
    return new ServiceName('Zaikos server');
  }
}
