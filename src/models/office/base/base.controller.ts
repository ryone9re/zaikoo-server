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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './../../../guard/auth/auth.guard';
import { BaseService } from './base.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { GetBaseDto } from './dto/get-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';

@ApiTags('office/base')
@Controller('/api/office/base')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ type: GetBaseDto })
  create(@Body() createBaseDto: CreateBaseDto) {
    return this.baseService.create(createBaseDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ type: [GetBaseDto] })
  findAll() {
    return this.baseService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ type: GetBaseDto })
  findOne(@Param('id') id: string) {
    return this.baseService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ type: GetBaseDto })
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateBaseDto) {
    return this.baseService.update(+id, updateBaseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ type: GetBaseDto })
  remove(@Param('id') id: string) {
    return this.baseService.remove(+id);
  }
}
