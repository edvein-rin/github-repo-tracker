import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['author', 'name'])
@Unique(['url'])
export class Repository {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  name: string;

  @Column()
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
