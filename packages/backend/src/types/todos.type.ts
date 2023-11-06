export interface ITodo {
  id?: string;
  title: string;
  description: string;
  isPrivate: boolean;
  isCompleted: boolean;
  userId?: string;
}

export interface IUpdateTodo {
  title?: string;
  description?: string;
  isPrivate?: boolean;
  isCompleted?: boolean;
}
