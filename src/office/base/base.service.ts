import { Injectable } from '@nestjs/common';

import { PrismaService } from './../../prisma.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';

@Injectable()
export class BaseService {
  constructor(private prisma: PrismaService) {}

  async create(createBaseDto: CreateBaseDto) {
    return this.prisma.base.create({ data: createBaseDto });
  }

  async findAll() {
    return this.prisma.base.findMany();
  }

  async findOne(id: number) {
    return this.prisma.base.findUnique({ where: { id: id } });
  }

  async update(id: number, updateBaseDto: UpdateBaseDto) {
    return this.prisma.base.update({ where: { id: id }, data: updateBaseDto });
  }

  async remove(id: number) {
    return this.prisma.base.delete({ where: { id: id } });
  }
}
