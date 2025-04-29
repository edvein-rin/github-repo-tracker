import { Test, TestingModule } from '@nestjs/testing';
import { UserRepositoryController } from './user-repository.controller';
import { UserRepositoryService } from './user-repository.service';

describe('UserRepositoryController', () => {
  let controller: UserRepositoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRepositoryController],
      providers: [UserRepositoryService],
    }).compile();

    controller = module.get<UserRepositoryController>(UserRepositoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
