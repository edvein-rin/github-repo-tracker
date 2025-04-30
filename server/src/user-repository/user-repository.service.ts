import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Repository as RepositoryEntity } from 'src/repository/entities/repository.entity';
import { GithubService } from 'src/github/github.service';

@Injectable()
export class UserRepositoryService {
  constructor(
    private githubService: GithubService,
    @InjectRepository(RepositoryEntity)
    private repositoryRepository: Repository<RepositoryEntity>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    userId: User['id'],
    repositoryAuthor: string,
    repositoryName: string,
  ): Promise<RepositoryEntity> {
    try {
      const githubRepository = await this.githubService.getRepository(
        repositoryAuthor,
        repositoryName,
      );

      const repository = this.repositoryRepository.create({
        author: githubRepository.owner.login,
        name: githubRepository.name,
        url: githubRepository.htmlUrl,
        starsCount: githubRepository.starsCount,
        forksCount: githubRepository.forksCount,
        openIssuesCount: githubRepository.openIssuesCount,
        creationDate: new Date(githubRepository.createdAt),
      });
      const newRepository = await this.repositoryRepository.save(repository);

      const user = await this.usersRepository.findOne({
        where: { id: +userId },
        relations: ['repositories'],
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      user.repositories = [...user.repositories, newRepository];
      await this.usersRepository.save(user);

      return newRepository;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Error fetching repository: Not Found') {
          throw new HttpException('Repository not found', HttpStatus.NOT_FOUND);
        }
      }

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(userId: User['id']): Promise<{
    repositories: RepositoryEntity[];
  }> {
    const user = await this.usersRepository.findOne({
      where: { id: +userId },
      relations: ['repositories'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return { repositories: user.repositories };
  }

  async reload(id: number): Promise<void> {
    const repository = await this.repositoryRepository.findOne({
      where: { id },
    });
    if (!repository) {
      throw new HttpException('Repository not found', HttpStatus.NOT_FOUND);
    }

    const githubRepository = await this.githubService.getRepository(
      repository.author,
      repository.name,
    );

    await this.repositoryRepository.update(id, {
      author: githubRepository.owner.login,
      name: githubRepository.name,
      url: githubRepository.htmlUrl,
      starsCount: githubRepository.starsCount,
      forksCount: githubRepository.forksCount,
      openIssuesCount: githubRepository.openIssuesCount,
      creationDate: new Date(githubRepository.createdAt),
    });
  }

  async remove(id: number): Promise<void> {
    await this.repositoryRepository.delete(id);
  }
}
