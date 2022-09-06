import { Controller, Get, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AppService, ServiceName } from './app.service';
import { AuthService, CheckAuth } from './guard/auth/auth.service';

@ApiTags('/')
@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @ApiOkResponse({ type: ServiceName })
  async getServiceName() {
    return this.appService.getSeriviceName();
  }

  @Get('auth')
  @ApiOkResponse({ type: CheckAuth })
  async checkAuth(@Req() request: Request) {
    return this.authService.checkAuth(request.cookies);
  }
}
