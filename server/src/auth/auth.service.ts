import * as crypto from 'node:crypto';

import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { User, UserWithoutCredentials } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  hashPassword(password: string): { hash: string; salt: string } {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');

    return { hash, salt };
  }

  verifyPassword(password: string, hash: string, salt: string): boolean {
    return (
      hash ===
      crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    );
  }

  async resolveCredentials(
    email: string,
    password: string,
  ): Promise<UserWithoutCredentials | null> {
    const userWithCredentials =
      await this.userService.findByEmailWithCredentials(email);
    if (!userWithCredentials) return null;

    const { passwordHash, passwordSalt, ...userWithoutCredentials } =
      userWithCredentials;

    return this.verifyPassword(password, passwordHash, passwordSalt)
      ? userWithoutCredentials
      : null;
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const { hash, salt } = this.hashPassword(password);
    const user = await this.userService.create({
      email,
      passwordHash: hash,
      passwordSalt: salt,
    });

    const accessToken = this.jwtService.sign({
      username: user.email,
      sub: user.id,
    });

    this.logger.debug(`register | email=${user.email}`);

    return { accessToken };
  }

  login(user: User): { accessToken: string } {
    this.logger.debug(`login | email=${user.email}`);

    const accessToken = this.jwtService.sign({
      username: user.email,
      sub: user.id,
    });

    return { accessToken };
  }
}
