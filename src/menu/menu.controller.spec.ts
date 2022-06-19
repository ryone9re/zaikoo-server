import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from './../prisma.service';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

describe('MenuController', () => {
  let controller: MenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [MenuService, PrismaService],
    }).compile();

    controller = module.get<MenuController>(MenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
