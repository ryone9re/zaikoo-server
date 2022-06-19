import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from './../prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createParent(data: Prisma.Parent_categoryCreateInput) {
    return this.prisma.parent_category.create({ data });
  }

  async createChild(data: Prisma.Child_categoryCreateInput) {
    return this.prisma.child_category.create({ data });
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const data: Prisma.Child_categoryCreateInput = {
      parent: {
        connectOrCreate: {
          where: createCategoryDto.parent,
          create: {
            name: createCategoryDto.parent.name,
          },
        },
      },
      name: createCategoryDto.name,
    };
    return this.createChild(data);
  }

  async findParent(input: Prisma.Parent_categoryWhereUniqueInput) {
    return this.prisma.parent_category.findUnique({
      where: {
        id: input.id,
        name: input.name,
      },
    });
  }

  async findChild(input: Prisma.Child_categoryWhereUniqueInput) {
    return this.prisma.child_category.findUnique({
      where: {
        id: input.id,
        parent_id_name: input.parent_id_name,
      },
    });
  }

  async findCategory(id: number) {
    return this.findChild({ id });
  }

  async findParentAll() {
    return this.prisma.parent_category.findMany();
  }

  async findChildAll() {
    return this.prisma.child_category.findMany();
  }

  async findCategoryAll() {
    return this.findChildAll();
  }

  async updateChild(id: number, body: UpdateCategoryDto) {
    const data: Prisma.Child_categoryUpdateInput = {
      name: body.name,
    };
    if (body.parent) {
      data.parent = {
        connect: { id: body.parent.id },
        update: { id: body.parent.id },
      };
    }
    let result;
    try {
      result = await this.prisma.child_category.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  async removeParent(id: number) {
    return this.prisma.parent_category.delete({ where: { id: id } });
  }

  async removeChild(id: number) {
    return this.prisma.child_category.delete({ where: { id: id } });
  }
}
