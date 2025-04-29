import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserRepositoryService } from './user-repository.service';
import { CreateUserRepositoryDto } from './dto/create-user-repository.dto';
import { ReloadUserRepositoryDto } from './dto/reload-user-repository.dto';

@Controller('user-repository')
export class UserRepositoryController {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  @Post()
  create(@Body() createUserRepositoryDto: CreateUserRepositoryDto) {
    return this.userRepositoryService.create(createUserRepositoryDto);
  }

  @Get()
  findAll() {
    return this.userRepositoryService.findAll();
  }

  @Patch(':id')
  reload(
    @Param('id') id: string,
    @Body() reloadUserRepositoryDto: ReloadUserRepositoryDto,
  ) {
    return this.userRepositoryService.reload(+id, reloadUserRepositoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRepositoryService.remove(+id);
  }
}
