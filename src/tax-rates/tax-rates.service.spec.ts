import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from './../prisma.service';
import { TaxRate } from './entities/tax-rate.entity';
import { TaxRatesService } from './tax-rates.service';

describe('TaxRatesService', () => {
  let service: TaxRatesService;
  let prisma: PrismaService;
  let taxResponse: TaxRate;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxRatesService, PrismaService],
    }).compile();

    service = module.get<TaxRatesService>(TaxRatesService);
    prisma = module.get<PrismaService>(PrismaService);
    return prisma.tax_rate.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    await expect(service.create({ rate: 0.1 })).resolves.toEqual({
      id: expect.any(Number),
      rate: 0.1,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
    await expect(service.create({ rate: 10 })).resolves.toEqual({
      id: expect.any(Number),
      rate: 10,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
    taxResponse = await service.create({ rate: 5.555555 });
    expect(taxResponse).toEqual({
      id: expect.any(Number),
      rate: 5.555555,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('findAll', async () => {
    await expect(service.findAll()).resolves.toEqual([
      {
        id: expect.any(Number),
        rate: 0.1,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
      {
        id: expect.any(Number),
        rate: 10,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
      {
        id: expect.any(Number),
        rate: 5.555555,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      },
    ]);
  });

  it('findOne', async () => {
    await expect(service.findOne(taxResponse.id)).resolves.toEqual(taxResponse);
  });

  it('update', async () => {
    taxResponse.rate = 1000;
    taxResponse.updated_at = expect.any(Date);
    await expect(
      service.update(taxResponse.id, { rate: taxResponse.rate }),
    ).resolves.toEqual(taxResponse);
  });

  it('delete', async () => {
    expect.assertions(2);
    await expect(service.remove(taxResponse.id)).resolves.toEqual(taxResponse);
    return service.remove(2000000).catch((e) => expect(e).toBe(e));
  });

  afterAll(async () => {
    await prisma.tax_rate.deleteMany({});
  });
});
