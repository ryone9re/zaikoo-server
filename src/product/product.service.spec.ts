import { Test, TestingModule } from '@nestjs/testing';

import { productMocks } from '../mocks/mocks';

import { PrismaService } from './../prisma.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('商品の一覧を返す', async () => {
    prisma.product.findMany = jest.fn().mockReturnValueOnce(productMocks);

    expect(await service.findAll()).toBe(productMocks);
  });
});
