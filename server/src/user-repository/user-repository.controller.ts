import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { UserRepositoryService } from './user-repository.service';
import { CreateUserRepositoryDto } from './dto/create-user-repository.dto';
import { ReloadUserRepositoryDto } from './dto/reload-user-repository.dto';

@UseGuards(JwtAuthGuard)
@Controller('users/:userId/repositories')
export class UserRepositoryController {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  @Post()
  create(
    @Param('userId') userId: string,
    @Body() createUserRepositoryDto: CreateUserRepositoryDto,
  ) {
    return this.userRepositoryService.create(createUserRepositoryDto);
  }

  @Get()
  findAll(@Param('userId') userId: string) {
    return this.userRepositoryService.findAll();
  }

  @Patch(':id')
  reload(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() reloadUserRepositoryDto: ReloadUserRepositoryDto,
  ) {
    return this.userRepositoryService.reload(+id, reloadUserRepositoryDto);
  }

  @Delete(':id')
  remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.userRepositoryService.remove(+id);
  }
}
