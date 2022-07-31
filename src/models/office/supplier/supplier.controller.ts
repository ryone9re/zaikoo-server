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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './../../../guard/auth/auth.guard';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { GetSupplierDto } from './dto/get-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierService } from './supplier.service';

@ApiTags('office/supplier')
@Controller('api/office/supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetSupplierDto })
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [GetSupplierDto] })
  async findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetSupplierDto })
  async findOne(@Param('id') id: string) {
    return this.supplierService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetSupplierDto })
  async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: GetSupplierDto })
  async remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }
}
