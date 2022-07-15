import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '../../prisma.service';

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
          create: { name: uuidv4(), parent: { create: { name: uuidv4() } } },
        },
        tax: { create: { rate: 0.1 } },
      },
    });
    testProductRequired1 = await prisma.product.create({
      data: {
        denomination: '本',
        name: 'ペットボトル',
        description: 'ポリエチレンテレフタラートボトル',
        part_number: 123456789,
        reorder_point: 5,
        category: {
          create: { name: uuidv4(), parent: { create: { name: uuidv4() } } },
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
            name: uuidv4(),
            parent: { create: { name: uuidv4() } },
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

  it('createMenu', async () => {
    await expect(
      service.createMenu({
        request_product_id: testProductRequest.id,
        requires: [
          {
            required_product_id: testProductRequired1.id,
            required_number: 3,
          },
          {
            required_product_id: testProductRequired2.id,
            required_number: 10,
          },
        ],
      }),
    ).resolves.toEqual({ count: 2 });
  });

  it('findMenu', async () => {
    await expect(service.findMenu(testProductRequest.id)).resolves.toEqual([
      {
        id: expect.any(Number),
        request_product_id: testProductRequest.id,
        required_product_id: testProductRequired1.id,
        required_number: 3,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
      {
        id: expect.any(Number),
        request_product_id: testProductRequest.id,
        required_product_id: testProductRequired2.id,
        required_number: 10,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    ]);
  });

  it('update', async () => {
    const testProd = await prisma.product.create({
      data: {
        denomination: 'L',
        name: '水',
        description: '天然水',
        part_number: 77289490,
        reorder_point: 1,
        category: {
          create: {
            name: uuidv4(),
            parent: { create: { name: uuidv4() } },
          },
        },
        tax: { create: { rate: 0.1 } },
      },
      select: {
        id: true,
        category_id: true,
        category: { select: { parent_id: true } },
        tax_id: true,
      },
    });
    const testMenu = await prisma.menu.create({
      data: {
        request_product_id: testProductRequest.id,
        required_product_id: testProd.id,
        required_number: 5,
      },
    });
    const { id } = testMenu;
    testMenu.required_number = 100;
    testMenu.updated_at = expect.any(Date);
    await expect(
      service.update(id, { required_number: testMenu.required_number }),
    ).resolves.toEqual(testMenu);
    await prisma.menu.delete({ where: { id: testMenu.id } });
    await prisma.product.delete({ where: { id: testProd.id } });
    await prisma.child_category.delete({ where: { id: testProd.category_id } });
    await prisma.parent_category.delete({
      where: { id: testProd.category.parent_id },
    });
    await prisma.tax_rate.delete({ where: { id: testProd.tax_id } });
  });

  it('deleteMenu(Single)', async () => {
    const first = await prisma.menu.findFirst();
    first.updated_at = expect.any(Date);
    await expect(service.remove(first.id)).resolves.toEqual(first);
    await expect(prisma.menu.findFirst()).resolves.not.toEqual(first);
  });

  afterAll(async () => {
    await prisma.menu.deleteMany({});
    await prisma.product.delete({ where: { id: testProductRequired1.id } });
    await prisma.product.delete({ where: { id: testProductRequired2.id } });
  });
});
