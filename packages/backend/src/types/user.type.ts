import { ITodo } from './todos.type';

export interface IUser {
  id?: string;
  email: string;
  password: string;
  todos?: ITodo[];
}

export interface IUserCreate {
  email: string;
  password: string;
}

export interface IJwtAuth {
  uid: string;
}
