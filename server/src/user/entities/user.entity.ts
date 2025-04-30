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
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  passwordSalt: string;

  @ManyToMany(() => Repository)
  @JoinTable()
  repositories: Repository[];
}
