import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['author', 'name'])
@Unique(['url'])
export class Repository {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  author: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  url: string;

  @Column({ type: 'int' })
  starsCount: number;

  @Column({ type: 'int' })
  forksCount: number;

  @Column({ type: 'int' })
  issuesCount: number;

  @Column({ type: 'timestamp' })
  creationDate: Date;
}
