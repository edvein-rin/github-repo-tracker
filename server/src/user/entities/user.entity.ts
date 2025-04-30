import { IsEmail, IsNotEmpty } from 'class-validator';
import { Repository } from 'src/repository/entities/repository.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ select: false })
  @IsNotEmpty()
  passwordHash: string;

  @Column({ select: false })
  @IsNotEmpty()
  passwordSalt: string;

  @ManyToMany(() => Repository)
  @JoinTable()
  repositories: Repository[];
}

export type UserWithoutCredentials = Omit<
  User,
  'passwordHash' | 'passwordSalt'
>;
