export class CreateUserDto {
  email: string;
  passwordHash: string;
  passwordSalt: string;
}
