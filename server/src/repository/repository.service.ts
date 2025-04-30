import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Repository as RepositoryEntity } from './entities/repository.entity';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(Repository)
    private repositoryRepository: Repository<RepositoryEntity>,
  ) {}

  async findAll(): Promise<RepositoryEntity[]> {
    return this.repositoryRepository.find();
  }

  async findOne(id: number): Promise<RepositoryEntity | null> {
    return this.repositoryRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.repositoryRepository.delete(id);
  }
}
