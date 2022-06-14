import { Test, TestingModule } from '@nestjs/testing';

import { productMocks } from '../mocks/mocks';

import { PrismaService } from './../prisma.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, PrismaService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/product (GET)', async () => {
    prisma.product.findMany = jest.fn().mockReturnValueOnce(productMocks);

    expect(await controller.findAll()).toBe(productMocks);
  });
});
