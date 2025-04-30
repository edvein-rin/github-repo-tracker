import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Logger,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { UserRepositoryService } from './user-repository.service';
import { CreateUserRepositoryDto } from './dto/create-user-repository.dto';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('users/:userId/repositories')
export class UserRepositoryController {
  private readonly logger = new Logger(UserRepositoryController.name);

  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  @Post()
  create(
    @Req() req: Request,
    @Param('userId') rawUserId: string,
    @Body() createUserRepositoryDto: CreateUserRepositoryDto,
  ) {
    const userId = +rawUserId;

    const user = req.user!;
    if (user.id !== userId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const { repositoryPath } = createUserRepositoryDto;
    const repositoryPathParts = repositoryPath.split('/');
    if (repositoryPathParts.length !== 2) {
      throw new HttpException(
        'Repository path should be in the format "author/name"',
        HttpStatus.BAD_REQUEST,
      );
    }
    const [repositoryAuthor, repositoryName] = repositoryPathParts;
    if (repositoryAuthor.length === 0 || repositoryName.length === 0) {
      throw new HttpException(
        'Repository path should be in the format "author/name"',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userRepositoryService.create(
      userId,
      repositoryAuthor,
      repositoryName,
    );
  }

  @Get()
  findAll(@Req() req: Request, @Param('userId') rawUserId: string) {
    const userId = +rawUserId;

    const user = req.user!;
    if (user.id !== userId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    this.logger.log(`findAll | userId = ${userId}`);
    return this.userRepositoryService.findAll(userId);
  }

  @Post(':id/reload')
  reload(
    @Req() req: Request,
    @Param('userId') rawUserId: string,
    @Param('id') rawId: string,
  ) {
    const userId = +rawUserId;
    const id = +rawId;

    const user = req.user!;
    if (user.id !== userId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.userRepositoryService.reload(id);
  }

  @Delete(':id')
  remove(
    @Req() req: Request,
    @Param('userId') rawUserId: string,
    @Param('id') rawId: string,
  ) {
    const userId = +rawUserId;
    const id = +rawId;

    const user = req.user!;
    if (user.id !== userId) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.userRepositoryService.remove(id);
  }
}
