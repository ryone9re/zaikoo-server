import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from './../../prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { SupplierService } from './supplier.service';

describe('SupplierService', () => {
  let service: SupplierService;
  let primsa: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierService, PrismaService],
    }).compile();

    service = module.get<SupplierService>(SupplierService);
    primsa = module.get<PrismaService>(PrismaService);
    return primsa.supplier.deleteMany({});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const createnoDivResName: CreateSupplierDto = {
    supplier_name: '仕入先1',
    postal_code: '1000001',
    address: '東京都千代田区千代田1-1',
    email_address: 'example@example.com',
    phone_number: '0120111222',
  };

  const createNoResName: CreateSupplierDto = {
    supplier_name: '仕入先2',
    postal_code: '4610047',
    address: '愛知県名古屋市東区大幸南１丁目１−１',
    email_address: 'example2@example.com',
    phone_number: '09090909090',
    division_name: 'ナゴヤ',
  };

  const createNoDivName: CreateSupplierDto = {
    supplier_name: '仕入先3',
    postal_code: '1000001',
    address: '東京都千代田区千代田1-1',
    email_address: 'example@example.com',
    phone_number: '0120111222',
    responsible_name: '織田信長',
  };

  const createWithBoth: CreateSupplierDto = {
    supplier_name: '仕入先4',
    postal_code: '1000001',
    address: '東京都千代田区千代田1-1',
    email_address: 'example@example.com',
    phone_number: '0120111222',
    division_name: '徳川軍',
    responsible_name: '井伊直政',
  };

  const additionalData = {
    id: expect.any(Number),
    created_at: expect.any(Date),
    updated_at: expect.any(Date),
  };

  let createResponseNoDivResName: CreateSupplierDto & typeof additionalData;

  let createResponseWithBoth: CreateSupplierDto & typeof additionalData;

  it('create', async () => {
    createResponseNoDivResName = await service.create(createnoDivResName);
    expect(createResponseNoDivResName).toEqual(
      Object.assign(createnoDivResName, additionalData, {
        division_name: null,
        responsible_name: null,
      }),
    );
    const resCreateNoResName = await service.create(createNoResName);
    expect(resCreateNoResName).toEqual(
      Object.assign(createNoResName, additionalData, {
        responsible_name: null,
      }),
    );
    const resCreateNoDivName = await service.create(createNoDivName);
    expect(resCreateNoDivName).toEqual(
      Object.assign(createNoDivName, additionalData, {
        division_name: null,
      }),
    );
    createResponseWithBoth = await service.create(createWithBoth);
    expect(createResponseWithBoth).toEqual(
      Object.assign(createWithBoth, additionalData),
    );
  });

  it('findAll', async () => {
    const wantValue = [
      createResponseNoDivResName,
      Object.assign(createNoResName, additionalData, {
        responsible_name: null,
      }),
      Object.assign(createNoDivName, additionalData, {
        division_name: null,
      }),
      createResponseWithBoth,
    ];
    await expect(service.findAll()).resolves.toEqual(wantValue);
  });

  it('findOne', async () => {
    await expect(service.findOne(createResponseWithBoth.id)).resolves.toEqual(
      createResponseWithBoth,
    );
  });

  it('update', async () => {
    // Update test for items division name and responsible name already exists.
    const id1 = createResponseWithBoth.id;
    createResponseWithBoth.supplier_name = '仕入先4変更';
    await expect(
      service.update(id1, {
        supplier_name: createResponseWithBoth.supplier_name,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseWithBoth, { updated_at: expect.any(Date) }),
    );
    createResponseWithBoth.postal_code = '9999999';
    await expect(
      service.update(id1, { postal_code: createResponseWithBoth.postal_code }),
    ).resolves.toEqual(
      Object.assign(createResponseWithBoth, { updated_at: expect.any(Date) }),
    );
    createResponseWithBoth.address = '奈良県奈良市雑司町406-1';
    await expect(
      service.update(id1, { address: createResponseWithBoth.address }),
    ).resolves.toEqual(
      Object.assign(createResponseWithBoth, { updated_at: expect.any(Date) }),
    );
    createResponseWithBoth.email_address = 'exampletest@test.test';
    await expect(
      service.update(id1, {
        email_address: createResponseWithBoth.email_address,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseWithBoth, { updated_at: expect.any(Date) }),
    );
    createResponseWithBoth.phone_number = '117';
    await expect(
      service.update(id1, {
        phone_number: createResponseWithBoth.phone_number,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseWithBoth, { updated_at: expect.any(Date) }),
    );
    createResponseWithBoth.division_name = '読売巨人軍';
    await expect(
      service.update(id1, {
        division_name: createResponseWithBoth.division_name,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseWithBoth, { updated_at: expect.any(Date) }),
    );
    createResponseWithBoth.responsible_name = '監督';
    await expect(
      service.update(id1, {
        responsible_name: createResponseWithBoth.responsible_name,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseWithBoth, { updated_at: expect.any(Date) }),
    );

    // Update test for items division name and responsible name is empty.
    const id2 = createResponseNoDivResName.id;
    createResponseNoDivResName.supplier_name = '仕入先1変更';
    await expect(
      service.update(id2, {
        supplier_name: createResponseNoDivResName.supplier_name,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNoDivResName, {
        updated_at: expect.any(Date),
      }),
    );
    createResponseNoDivResName.postal_code = '7777777';
    await expect(
      service.update(id2, {
        postal_code: createResponseNoDivResName.postal_code,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNoDivResName, {
        updated_at: expect.any(Date),
      }),
    );
    createResponseNoDivResName.address = '大阪府大阪市浪速区なにわ1-1';
    await expect(
      service.update(id2, { address: createResponseNoDivResName.address }),
    ).resolves.toEqual(
      Object.assign(createResponseNoDivResName, {
        updated_at: expect.any(Date),
      }),
    );
    createResponseNoDivResName.email_address = 'test@example.com';
    await expect(
      service.update(id2, {
        email_address: createResponseNoDivResName.email_address,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNoDivResName, {
        updated_at: expect.any(Date),
      }),
    );
    createResponseNoDivResName.phone_number = '0742265166';
    await expect(
      service.update(id2, {
        phone_number: createResponseNoDivResName.phone_number,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNoDivResName, {
        updated_at: expect.any(Date),
      }),
    );
    createResponseNoDivResName.division_name = "株式会社Women's Future Center";
    await expect(
      service.update(id2, {
        division_name: createResponseNoDivResName.division_name,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNoDivResName, {
        updated_at: expect.any(Date),
      }),
    );
    createResponseNoDivResName.responsible_name = '代表';
    await expect(
      service.update(id2, {
        responsible_name: createResponseNoDivResName.responsible_name,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNoDivResName, {
        updated_at: expect.any(Date),
      }),
    );
  });

  it('delete', async () => {
    await expect(service.remove(createResponseWithBoth.id)).resolves.toEqual(
      createResponseWithBoth,
    );
  });

  it('findResultAll', async () => {
    const wantValue = [];
    wantValue.push(
      Object.assign(createResponseNoDivResName, {
        updated_at: expect.any(Date),
      }),
      Object.assign(createNoResName, additionalData, {
        responsible_name: null,
      }),
      Object.assign(createNoDivName, additionalData, {
        division_name: null,
      }),
    );
    await expect(service.findAll()).resolves.toEqual(wantValue);
  });
});
