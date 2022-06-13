import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'

import { CreateRootDto } from './dto/create-root.dto'
import { UpdateRootDto } from './dto/update-root.dto'
import { RootService } from './root.service'

@Controller('root')
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @Post()
  create(@Body() createRootDto: CreateRootDto) {
    return this.rootService.create(createRootDto)
  }

  @Get()
  findAll() {
    return this.rootService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rootService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRootDto: UpdateRootDto) {
    return this.rootService.update(+id, updateRootDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rootService.remove(+id)
  }
}
