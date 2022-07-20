import { Test, TestingModule } from '@nestjs/testing';
import { Child_category, Tax_rate } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from './../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  let testCategory: Child_category;
  let testTaxRate: Tax_rate;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);

    testCategory = await prisma.child_category.create({
      data: {
        parent: { create: { name: uuidv4() } },
        name: uuidv4(),
      },
    });
    testTaxRate = await prisma.tax_rate.create({
      data: { rate: 0.1 },
    });
    return prisma.product.deleteMany({});
  });

  let createProductNoOptional: CreateProductDto;
  let createProductNoOptionalResult: Product;
  let createProductWtW: CreateProductDto;
  let createProductWtWResult: Product;

  const addition = {
    id: expect.any(Number),
    created_at: expect.any(Date),
    updated_at: expect.any(Date),
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    createProductNoOptional = {
      denomination: '個',
      name: '大和茶',
      category_id: testCategory.id,
      tax_id: testTaxRate.id,
    };
    createProductNoOptionalResult = await service.create(
      createProductNoOptional,
    );
    expect(createProductNoOptionalResult).toEqual(
      Object.assign(createProductNoOptional, addition, {
        description: null,
        part_number: null,
        reorder_point: null,
      }),
    );

    createProductWtW = {
      denomination: 'g',
      name: 'おちゃっぱ',
      category_id: testCategory.id,
      tax_id: testTaxRate.id,
      description: '奈良県産',
      part_number: 1224432,
      reorder_point: 500,
    };
    createProductWtWResult = await service.create(createProductWtW);
    expect(createProductWtWResult).toEqual(
      Object.assign(createProductWtW, addition),
    );
  });

  it('findAll', async () => {
    await expect(service.findAll()).resolves.toEqual([
      createProductNoOptionalResult,
      createProductWtWResult,
    ]);
  });

  it('findOne', async () => {
    await expect(
      service.findOne(createProductNoOptionalResult.id),
    ).resolves.toEqual(createProductNoOptionalResult);

    await expect(service.findOne(createProductWtWResult.id)).resolves.toEqual(
      createProductWtWResult,
    );
  });

  it('update', async () => {
    createProductNoOptionalResult.updated_at = expect.any(Date);

    createProductNoOptional.description = '奥大和産';
    createProductNoOptionalResult.description = '奥大和産';
    await expect(
      service.update(createProductNoOptionalResult.id, createProductNoOptional),
    ).resolves.toEqual(createProductNoOptionalResult);

    createProductNoOptional.part_number = 1111111111;
    createProductNoOptionalResult.part_number = 1111111111;
    await expect(
      service.update(createProductNoOptionalResult.id, createProductNoOptional),
    ).resolves.toEqual(createProductNoOptionalResult);

    createProductNoOptional.reorder_point = 10;
    createProductNoOptionalResult.reorder_point = 10;
    await expect(
      service.update(createProductNoOptionalResult.id, createProductNoOptional),
    ).resolves.toEqual(createProductNoOptionalResult);
  });

  it('delete', async () => {
    await expect(
      service.remove(createProductNoOptionalResult.id),
    ).resolves.toEqual(createProductNoOptionalResult);

    await expect(service.remove(createProductWtWResult.id)).resolves.toEqual(
      createProductWtWResult,
    );

    await expect(service.findAll()).resolves.toEqual([]);
  });

  it('Invalid data', async () => {
    await expect(
      service.create({
        denomination: '個',
        name: '大和茶',
        category_id: 0,
        tax_id: 0,
      }),
    ).rejects.toThrow(Error);

    const invalidTest = await service.create({
      denomination: 'g',
      name: 'おちゃっぱ',
      category_id: testCategory.id,
      tax_id: testTaxRate.id,
      description: '奈良県産',
      part_number: 1224432,
      reorder_point: 500,
    });
    expect(invalidTest).toHaveProperty('id');

    const { id, denomination, name } = invalidTest;
    invalidTest.updated_at = expect.any(Date);
    await expect(
      service.update(id, {
        denomination: denomination,
        name: name,
        category_id: 0,
        tax_id: 0,
      }),
    ).resolves.toEqual(invalidTest);

    await expect(service.remove(invalidTest.id)).resolves.toEqual(invalidTest);
  });

  afterAll(async () => {
    await prisma.product.deleteMany({});
    await prisma.child_category.delete({ where: { id: testCategory.id } });
    await prisma.parent_category.delete({
      where: { id: testCategory.parent_id },
    });
    await prisma.tax_rate.delete({ where: { id: testTaxRate.id } });
  });
});
