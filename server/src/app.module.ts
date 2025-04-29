import { Module } from '@nestjs/common';
import { GithubModule } from './github/github.module';
import { UserModule } from './user/user.module';
import { RepositoryModule } from './repository/repository.module';
import { UserRepositoryModule } from './user-repository/user-repository.module';

@Module({
  imports: [GithubModule, RepositoryModule, UserModule, UserRepositoryModule],
})
export class AppModule {}
