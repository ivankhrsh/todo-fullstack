export interface ITodo {
  id?: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isCompleted: boolean;
}

export interface ITodoWithId {
  id: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isCompleted: boolean;
  userId: string;
}

export enum FilterType {
  ALL = 'All',
  PUBLIC = 'Public',
  PRIVATE = 'Private'
}

export enum IsCompleted {
  COMPLETED = 'Completed'
}

export interface GetTodosResponse {
  todos: ITodoWithId[];
  limit: number;
}
