import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, Relation } from 'typeorm';
import type { User } from './User';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: true })
  isPrivate: boolean;

  @Column({ default: false })
  isCompleted: boolean;

  @Column()
  userId: string;

  // @ManyToOne('User', 'todos')
  // userId: Relation<User>;

  @ManyToOne('User', 'todos')
  user: Relation<User>;
}
