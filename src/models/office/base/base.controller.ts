import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthGuard } from './../../../guard/auth/auth.guard';
import { BaseService } from './base.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { GetBaseDto, GetBaseNameListDto } from './dto/get-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';

@ApiTags('office/base')
// @ApiOAuth2(['all:all'])
@ApiBearerAuth()
@Controller('/api/office/base')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: GetBaseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async create(@Body() createBaseDto: CreateBaseDto) {
    return this.baseService.create(createBaseDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetBaseDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findAll() {
    return this.baseService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetBaseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findOne(@Param('id') id: string) {
    return this.baseService.findOne(+id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetBaseNameListDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async findAllByName() {
    return this.baseService.findAllByName();
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetBaseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async update(@Param('id') id: string, @Body() updateBaseDto: UpdateBaseDto) {
    return this.baseService.update(+id, updateBaseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetBaseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request' })
  async remove(@Param('id') id: string) {
    return this.baseService.remove(+id);
  }
}
