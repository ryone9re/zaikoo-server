import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

class ServiceName {
  serviceName: string;
}

@ApiTags('/')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ type: ServiceName })
  async getServiceName() {
    return this.appService.getSeriviceName();
  }
}
