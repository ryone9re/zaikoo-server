import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../libs/prisma/prisma.service';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, PrismaService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prisma = module.get<PrismaService>(PrismaService);
    await prisma.child_category.deleteMany({});
    await prisma.parent_category.deleteMany({});
    await prisma.parent_category.createMany({
      data: [
        {
          id: 1,
          name: '親カテゴリ1',
        },
        {
          id: 2,
          name: '親カテゴリ2',
        },
        {
          id: 3,
          name: '親カテゴリ3',
        },
      ],
    });
    return prisma.child_category.createMany({
      data: [
        {
          id: 1,
          name: '子カテゴリ1-1',
          parent_id: 1,
        },
        {
          id: 2,
          name: '子カテゴリ1-2',
          parent_id: 1,
        },
        {
          id: 3,
          name: '子カテゴリ2-1',
          parent_id: 2,
        },
        {
          id: 4,
          name: '子カテゴリ2-2',
          parent_id: 2,
        },
      ],
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createParent', async () => {
    const res = await service.createParent({ name: 'テスト親カテゴリ1' });
    expect(res).toEqual({
      id: expect.any(Number),
      name: 'テスト親カテゴリ1',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('createChild', async () => {
    const res = await service.createChild({
      name: 'テスト子カテゴリ1',
      parent: {
        connect: {
          id: 1,
        },
      },
    });
    expect(res).toEqual({
      id: expect.any(Number),
      parent_id: 1,
      name: 'テスト子カテゴリ1',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('findCategory', async () => {
    const res = await service.findCategory(1);
    expect(res).toEqual({
      id: 1,
      name: '子カテゴリ1-1',
      parent_id: 1,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('updateChild', async () => {
    const res = await service.updateChild(3, {
      name: '名前変更後子カテゴリ3-1',
      parent: {
        id: 3,
      },
    });
    expect(res).toEqual({
      id: expect.any(Number),
      parent_id: 3,
      name: '名前変更後子カテゴリ3-1',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('removeChild', async () => {
    await service.removeChild(4);
    const res = await prisma.child_category.findUnique({ where: { id: 4 } });
    expect(res).toBeNull();
  });

  it('removeChild', async () => {
    await service.removeParent(2);
    const res = await prisma.parent_category.findUnique({ where: { id: 4 } });
    expect(res).toBeNull();
  });

  afterAll(async () => {
    await prisma.child_category.deleteMany({});
    await prisma.parent_category.deleteMany({});
  });
});
