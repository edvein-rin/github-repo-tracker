import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RepositoryService } from './repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Repository])],
  providers: [RepositoryService],
})
export class RepositoryModule {}
