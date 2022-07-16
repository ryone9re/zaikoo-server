import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../libs/prisma/prisma.service';

import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(private prisma: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto) {
    return this.prisma.supplier.create({ data: createSupplierDto });
  }

  async findAll() {
    return this.prisma.supplier.findMany();
  }

  async findOne(id: number) {
    return this.prisma.supplier.findUnique({ where: { id: id } });
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const data = updateSupplierDto;
    if (typeof updateSupplierDto.division_name == undefined) {
      data.division_name == null;
    }
    if (typeof updateSupplierDto.responsible_name == undefined) {
      data.responsible_name == null;
    }
    return this.prisma.supplier.update({ where: { id: id }, data: data });
  }

  async remove(id: number) {
    return this.prisma.supplier.delete({ where: { id: id } });
  }
}
