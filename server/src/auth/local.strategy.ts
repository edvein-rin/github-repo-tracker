import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { UserWithoutCredentials } from 'src/user/entities/user.entity';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<UserWithoutCredentials> {
    this.logger.debug(`validate | username=${username}`);
    const user = await this.authService.resolveCredentials(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
