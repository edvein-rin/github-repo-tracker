import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GithubModule } from 'src/github/github.module';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'src/repository/entities/repository.entity';

import { UserRepositoryService } from './user-repository.service';
import { UserRepositoryController } from './user-repository.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Repository]),
    TypeOrmModule.forFeature([User]),
    GithubModule,
  ],
  controllers: [UserRepositoryController],
  providers: [UserRepositoryService],
})
export class UserRepositoryModule {}
