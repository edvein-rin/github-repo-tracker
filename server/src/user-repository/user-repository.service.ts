import { Injectable } from '@nestjs/common';
import { CreateUserRepositoryDto } from './dto/create-user-repository.dto';
import { ReloadUserRepositoryDto } from './dto/reload-user-repository.dto';

@Injectable()
export class UserRepositoryService {
  create(createUserRepositoryDto: CreateUserRepositoryDto) {
    return 'This action adds a new userRepository';
  }

  findAll() {
    return `This action returns all userRepository`;
  }

  reload(id: number, reloadUserRepositoryDto: ReloadUserRepositoryDto) {
    return `This action reload a #${id} userRepository`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRepository`;
  }
}
