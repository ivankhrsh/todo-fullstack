import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import type { Todo } from './Todo';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany('Todo', 'user')
  todos: Relation<Todo[]>;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: '' })
  passwordResetCode: string;

  @Column({ default: '' })
  codeExpiresAt: string;
}
