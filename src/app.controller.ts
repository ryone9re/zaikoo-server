import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

class ServiceName {
  serviceName: string;
}

@ApiTags('/')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ type: ServiceName })
  async getServiceName() {
    return this.appService.getSeriviceName();
  }
}
