import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoryModule } from 'src/repository/repository.module';

import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RepositoryModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
