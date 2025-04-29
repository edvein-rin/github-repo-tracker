import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user-repository.service';
import { UserRepositoryController } from './user-repository.controller';

@Module({
  controllers: [UserRepositoryController],
  providers: [UserRepositoryService],
})
export class UserRepositoryModule {}
