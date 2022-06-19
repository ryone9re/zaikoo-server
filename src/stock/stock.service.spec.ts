import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from './../prisma.service';
import { StockService } from './stock.service';

describe('StockService', () => {
  let service: StockService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockService, PrismaService],
    }).compile();

    service = module.get<StockService>(StockService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
