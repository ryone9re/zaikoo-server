import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

class ServiceName {
  @ApiProperty()
  serviceName: string;
}

@ApiTags('/')
@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ type: ServiceName })
  async getServiceName() {
    return this.appService.getSeriviceName();
  }
}
