import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ServiceName {
  @ApiProperty()
  serviceName: string;

  constructor(readonly name: string) {
    this.serviceName = name;
  }
}

@Injectable()
export class AppService {
  getSeriviceName() {
    return new ServiceName('Zaikos server');
  }
}
