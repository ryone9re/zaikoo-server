import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from './../../prisma.service';
import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseService, PrismaService],
    }).compile();

    service = module.get<BaseService>(BaseService);
    prisma = module.get<PrismaService>(PrismaService);

    await prisma.base.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
