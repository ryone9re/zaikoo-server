import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from './app.controller'
import { PrismaService } from './prisma.service'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [PrismaService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const data = await appController.getAllUsers()
      expect(data).toStrictEqual([
        {
          id: 1,
          email: 'mail@mail.mail',
          name: 'Hello',
        },
      ])
    })
  })
})
