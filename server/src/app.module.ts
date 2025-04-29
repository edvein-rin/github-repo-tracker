import { Module } from '@nestjs/common';

import { GithubModule } from './github/github.module';
import { UserModule } from './user/user.module';
import { RepositoryModule } from './repository/repository.module';
import { UserRepositoryModule } from './user-repository/user-repository.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    GithubModule,
    RepositoryModule,
    UserModule,
    UserRepositoryModule,
  ],
})
export class AppModule {}
