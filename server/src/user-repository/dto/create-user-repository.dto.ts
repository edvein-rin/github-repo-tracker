import { IsNotEmpty } from 'class-validator';

export class CreateUserRepositoryDto {
  @IsNotEmpty()
  repositoryPath: string;
}
