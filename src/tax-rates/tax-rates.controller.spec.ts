import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from './../prisma.service';
import { TaxRatesController } from './tax-rates.controller';
import { TaxRatesService } from './tax-rates.service';

describe('TaxRatesController', () => {
  let controller: TaxRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxRatesController],
      providers: [TaxRatesService, PrismaService],
    }).compile();

    controller = module.get<TaxRatesController>(TaxRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
