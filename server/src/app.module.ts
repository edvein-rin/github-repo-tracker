import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GithubModule } from './github/github.module';
import { UserModule } from './user/user.module';
import { RepositoryModule } from './repository/repository.module';
import { UserRepositoryModule } from './user-repository/user-repository.module';
import { validate } from './config/validate';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
      isGlobal: true,
    }),
    GithubModule,
    RepositoryModule,
    UserModule,
    UserRepositoryModule,
  ],
})
export class AppModule {}
