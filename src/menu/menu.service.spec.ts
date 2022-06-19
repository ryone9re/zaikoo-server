import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '@prisma/client';
import { v7 as uuidv7 } from 'uuid';

import { PrismaService } from './../prisma.service';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;
  let prisma: PrismaService;

  let testProductRequest: Product;
  let testProductRequired1: Product;
  let testProductRequired2: Product;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuService, PrismaService],
    }).compile();

    service = module.get<MenuService>(MenuService);
    prisma = module.get<PrismaService>(PrismaService);

    testProductRequest = await prisma.product.create({
      data: {
        denomination: '本',
        name: '炭酸飲料',
        description: 'おいしいよ',
        part_number: 9999999,
        reorder_point: 3,
        category: {
          create: { name: uuidv7(), parent: { create: { name: uuidv7() } } },
        },
        tax: { create: { rate: 0.1 } },
      },
    });
    testProductRequired1 = await prisma.product.create({
      data: {
        denomination: 'g',
        name: '二酸化炭素',
        description: '圧縮します',
        part_number: 777777777,
        reorder_point: 10,
        category: {
          create: { name: uuidv7(), parent: { create: { name: uuidv7() } } },
        },
        tax: { create: { rate: 0.1 } },
      },
    });
    testProductRequired2 = await prisma.product.create({
      data: {
        denomination: 'g',
        name: '二酸化炭素',
        description: '圧縮します',
        part_number: 777777777,
        reorder_point: 10,
        category: {
          create: {
            name: uuidv7(),
            parent: { create: { name: uuidv7() } },
          },
        },
        tax: { create: { rate: 0.1 } },
      },
    });
    return prisma.menu.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await prisma.product.delete({ where: { id: testProductRequest.id } });
    await prisma.product.delete({ where: { id: testProductRequired1.id } });
    await prisma.product.delete({ where: { id: testProductRequired2.id } });
  });
});
