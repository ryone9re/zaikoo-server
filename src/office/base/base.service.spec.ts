import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from './../../prisma.service';
import { BaseService } from './base.service';
import { CreateBaseDto } from './dto/create-base.dto';

describe('BaseService', () => {
  let service: BaseService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseService, PrismaService],
    }).compile();

    service = module.get<BaseService>(BaseService);
    prisma = module.get<PrismaService>(PrismaService);

    return prisma.base.deleteMany({});
  });

  const createNotIncludeRequired: CreateBaseDto = {
    base_name: '拠点1',
    postal_code: '1000001',
    address: '東京都千代田区千代田１−１',
  };

  const createWallToWall: CreateBaseDto = {
    base_name: '拠点2',
    postal_code: '6000000',
    address: '奈良県奈良市ならまち１０００',
    phone_number: '0120111222',
    email_address: 'example@example.com',
    division_name: 'システム部',
    responsible_name: '井伊直政',
  };

  const additionalData = {
    id: expect.any(Number),
    created_at: expect.any(Date),
    updated_at: expect.any(Date),
  };

  let createResponseNotIncludeRequired: CreateBaseDto & typeof additionalData;

  let createResponseWallToWall: CreateBaseDto & typeof additionalData;

  it('create', async () => {
    createResponseNotIncludeRequired = await service.create(
      createNotIncludeRequired,
    );
    expect(createResponseNotIncludeRequired).toEqual(
      Object.assign(createNotIncludeRequired, additionalData, {
        phone_number: null,
        email_address: null,
        division_name: null,
        responsible_name: null,
      }),
    );
    createResponseWallToWall = await service.create(createWallToWall);
    expect(createResponseWallToWall).toEqual(
      Object.assign(createWallToWall, additionalData),
    );
  });

  it('findAll', async () => {
    const wantValue = [
      createResponseNotIncludeRequired,
      createResponseWallToWall,
    ];
    await expect(service.findAll()).resolves.toEqual(wantValue);
  });

  it('findOne', async () => {
    await expect(service.findOne(createResponseWallToWall.id)).resolves.toEqual(
      createResponseWallToWall,
    );
  });

  it('update', async () => {
    // Update test for items division name and responsible name already exists.
    const id1 = createResponseWallToWall.id;
    createResponseWallToWall.base_name = '拠点2変更';
    await expect(
      service.update(id1, {
        base_name: createResponseWallToWall.base_name,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseWallToWall, { updated_at: expect.any(Date) }),
    );
    createResponseWallToWall.postal_code = '９９９９９９９';
    await expect(
      service.update(id1, {
        postal_code: createResponseWallToWall.postal_code,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseWallToWall, { updated_at: expect.any(Date) }),
    );
    createResponseWallToWall.address = '奈良県奈良市雑司町406-1';
    await expect(
      service.update(id1, { address: createResponseWallToWall.address }),
    ).resolves.toEqual(
      Object.assign(createResponseWallToWall, { updated_at: expect.any(Date) }),
    );
    createResponseWallToWall.email_address = 'exampletest@test.test';
    await expect(
      service.update(id1, {
        email_address: createResponseWallToWall.email_address,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseWallToWall, { updated_at: expect.any(Date) }),
    );
    createResponseWallToWall.phone_number = '117';
    await expect(
      service.update(id1, {
        phone_number: createResponseWallToWall.phone_number,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseWallToWall, { updated_at: expect.any(Date) }),
    );
    createResponseWallToWall.division_name = '読売巨人軍';
    await expect(
      service.update(id1, {
        division_name: createResponseWallToWall.division_name,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseWallToWall, { updated_at: expect.any(Date) }),
    );
    createResponseWallToWall.responsible_name = '監督';
    await expect(
      service.update(id1, {
        responsible_name: createResponseWallToWall.responsible_name,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseWallToWall, { updated_at: expect.any(Date) }),
    );

    // Update test for items division name and responsible name is empty.
    const id2 = createResponseNotIncludeRequired.id;
    createResponseNotIncludeRequired.base_name = '拠点1変更';
    await expect(
      service.update(id2, {
        base_name: createResponseNotIncludeRequired.base_name,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNotIncludeRequired, {
        updated_at: expect.any(Date),
      }),
    );
    createResponseNotIncludeRequired.postal_code = '7777777';
    await expect(
      service.update(id2, {
        postal_code: createResponseNotIncludeRequired.postal_code,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNotIncludeRequired, {
        updated_at: expect.any(Date),
      }),
    );
    createResponseNotIncludeRequired.address = '大阪府大阪市浪速区なにわ1-1';
    await expect(
      service.update(id2, {
        address: createResponseNotIncludeRequired.address,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNotIncludeRequired, {
        updated_at: expect.any(Date),
      }),
    );
    createResponseNotIncludeRequired.email_address = 'test@example.com';
    await expect(
      service.update(id2, {
        email_address: createResponseNotIncludeRequired.email_address,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNotIncludeRequired, {
        updated_at: expect.any(Date),
      }),
    );
    createResponseNotIncludeRequired.phone_number = '0742265166';
    await expect(
      service.update(id2, {
        phone_number: createResponseNotIncludeRequired.phone_number,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNotIncludeRequired, {
        updated_at: expect.any(Date),
      }),
    );
    createResponseNotIncludeRequired.division_name =
      "株式会社Women's Future Center";
    await expect(
      service.update(id2, {
        division_name: createResponseNotIncludeRequired.division_name,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNotIncludeRequired, {
        updated_at: expect.any(Date),
      }),
    );
    createResponseNotIncludeRequired.responsible_name = '代表';
    await expect(
      service.update(id2, {
        responsible_name: createResponseNotIncludeRequired.responsible_name,
      }),
    ).resolves.toEqual(
      Object.assign(createResponseNotIncludeRequired, {
        updated_at: expect.any(Date),
      }),
    );
  });

  it('delete', async () => {
    await expect(service.remove(createResponseWallToWall.id)).resolves.toEqual(
      createResponseWallToWall,
    );
  });

  it('findResultAll', async () => {
    await expect(service.findAll()).resolves.toEqual([
      createResponseNotIncludeRequired,
    ]);
  });
});
