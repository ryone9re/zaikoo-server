import { Test, TestingModule } from '@nestjs/testing';
import {
  Base,
  Child_category,
  Product,
  Supplier,
  Tax_rate,
} from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from './../prisma.service';
import { Stock } from './entities/stock.entity';
import { StockService } from './stock.service';

import { MenuService } from 'src/menu/menu.service';

describe('StockService', () => {
  let service: StockService;
  let prisma: PrismaService;

  let testCategory: Child_category;
  let testTax: Tax_rate;
  let testProduct: Product;
  let testProductIngredient1: Product;
  let testProductIngredient2: Product;
  let testSupplier: Supplier;
  let testBase: Base;

  const additionalData = {
    id: expect.any(Number),
    created_at: expect.any(Date),
    updated_at: expect.any(Date),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockService, PrismaService, MenuService],
    }).compile();

    service = module.get<StockService>(StockService);
    prisma = module.get<PrismaService>(PrismaService);

    testCategory = await prisma.child_category.create({
      data: {
        name: uuidv4(),
        parent: {
          create: {
            name: uuidv4(),
          },
        },
      },
    });
    testTax = await prisma.tax_rate.create({
      data: {
        rate: 0.1,
      },
    });
    testProduct = await prisma.product.create({
      data: {
        denomination: '本',
        name: 'お茶',
        description: '粗茶ですが',
        part_number: 123456789,
        reorder_point: 5,
        category_id: testCategory.id,
        tax_id: testTax.id,
      },
    });
    testProductIngredient1 = await prisma.product.create({
      data: {
        denomination: 'g',
        name: 'お茶っ葉',
        description: 'お茶の原材料1',
        part_number: 332323245,
        reorder_point: 100,
        category_id: testCategory.id,
        tax_id: testTax.id,
      },
    });
    testProductIngredient2 = await prisma.product.create({
      data: {
        denomination: 'L',
        name: '水',
        description: 'お茶の原材料2',
        part_number: 8218674,
        reorder_point: 1,
        category_id: testCategory.id,
        tax_id: testTax.id,
      },
    });
    testSupplier = await prisma.supplier.create({
      data: {
        supplier_name: '取引先',
        postal_code: '1000001',
        address: '東京都千代田区千代田1-1',
        email_address: 'example@example.com',
        phone_number: '09090909090',
        division_name: '製造部',
        responsible_name: '山田太郎',
      },
    });
    testBase = await prisma.base.create({
      data: {
        base_name: '取引先',
        postal_code: '1000001',
        address: '東京都千代田区千代田1-1',
        email_address: 'example@example.com',
        phone_number: '09090909090',
        division_name: '製造部',
        responsible_name: '佐藤花子',
      },
    });
    await prisma.menu.createMany({
      data: [
        {
          // お茶っ葉
          request_product_id: testProduct.id,
          required_product_id: testProductIngredient1.id,
          required_number: 500,
        },
        {
          // 水
          request_product_id: testProduct.id,
          required_product_id: testProductIngredient2.id,
          required_number: 1,
        },
      ],
    });
    return prisma.stock.deleteMany({});
  });

  let createResult1: Stock;
  let createResult2: Stock;
  let createFromMenuResult1;

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    const createTest1Req = {
      product_id: testProductIngredient1.id,
      supplier_id: testSupplier.id,
      stock_quantity: 1000,
      purchase_unit_price: 10,
      base_id: testBase.id,
    };
    const createTest1Res = {
      ...createTest1Req,
      selling_unit_price: null,
      ...additionalData,
    };
    createResult1 = await service.create(createTest1Req);
    expect(createResult1).toEqual(createTest1Res);
    const createTest2Req = {
      product_id: testProductIngredient1.id,
      supplier_id: testSupplier.id,
      stock_quantity: 10,
      purchase_unit_price: 10,
      base_id: testBase.id,
    };
    const createTest2Res = {
      ...createTest2Req,
      selling_unit_price: null,
      ...additionalData,
    };
    createResult2 = await service.create(createTest2Req);
    expect(createResult2).toEqual(createTest2Res);
  });

  it('findAll', async () => {
    await expect(service.findAll()).resolves.toEqual([
      createResult1,
      createResult2,
    ]);
  });

  it('find', async () => {
    await expect(service.findOne(createResult1.id)).resolves.toEqual(
      createResult1,
    );
    await expect(service.findOne(createResult2.id)).resolves.toEqual(
      createResult2,
    );
  });

  it('update', async () => {
    const res = { ...createResult1 };
    createResult1 = await service.update(createResult1.id, {
      stock_quantity: 2000,
    });
    expect(createResult1).toEqual({
      ...res,
      stock_quantity: 2000,
      updated_at: expect.any(Date),
    });
  });

  it.skip('createFromMenu', async () => {
    const createFromMenuTest1Req = {
      product_id: testProduct.id,
      stock_quantity: 2,
      base_id: testBase.id,
    };
    const createFromMenuTest1Res = {
      ...createFromMenuTest1Req,
      ...additionalData,
    };
    createFromMenuResult1 = await service.createFromMenu(
      createFromMenuTest1Req,
    );
    expect(createFromMenuResult1).toEqual(createFromMenuTest1Res);
    await prisma.stock.delete({ where: { id: createFromMenuTest1Res.id } });
  });

  it('delete', async () => {
    await expect(service.remove(createResult1.id)).resolves.toEqual(
      createResult1,
    );
    await expect(service.remove(createResult2.id)).resolves.toEqual(
      createResult2,
    );
    await expect(
      prisma.stock.findUnique({ where: { id: createResult1.id } }),
    ).rejects.toThrow(Error);
    await expect(
      prisma.stock.findUnique({ where: { id: createResult2.id } }),
    ).rejects.toThrow(Error);
  });

  afterAll(async () => {
    await prisma.menu.deleteMany({});
    await prisma.base.delete({ where: { id: testBase.id } });
    await prisma.supplier.delete({ where: { id: testSupplier.id } });
    await prisma.product.delete({ where: { id: testProductIngredient2.id } });
    await prisma.product.delete({ where: { id: testProductIngredient1.id } });
    await prisma.product.delete({ where: { id: testProduct.id } });
    await prisma.tax_rate.delete({ where: { id: testTax.id } });
    await prisma.child_category.delete({ where: { id: testCategory.id } });
    await prisma.parent_category.delete({
      where: { id: testCategory.parent_id },
    });
  });
});
