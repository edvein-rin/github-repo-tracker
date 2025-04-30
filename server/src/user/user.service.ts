import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, UserWithoutCredentials } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserWithoutCredentials[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserWithoutCredentials | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmailWithCredentials(email: string): Promise<User | null> {
    return (
      (await this.usersRepository
        .createQueryBuilder('row')
        .select('*')
        .where('row.email = :email', { email })
        .getRawOne()) ?? null
    );
  }

  async create(createUserDto: CreateUserDto): Promise<UserWithoutCredentials> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, passwordSalt, ...restFields } =
      await this.usersRepository.save(
        this.usersRepository.create(createUserDto),
      );

    // A required measure due to
    // https://github.com/typeorm/typeorm/issues/828
    return restFields as User;
  }
}
