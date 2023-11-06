import { todoService } from '../../../service/todo.service';
import { GetTodosResponse, ITodo } from '../../common/types/todo.types';

export const handleAddTodo = async (todo: ITodo): Promise<void> => {
  await todoService.addTodo(todo);
};

export const handleDeleteTodo = async (id: string): Promise<void> => {
  await todoService.deleteTodo(id);
};

export const handleUpdateTodo = async (todo: ITodo): Promise<void> => {
  await todoService.updateTodo(todo);
};

export const getTodo = async (id: string): Promise<ITodo> => {
  const { data } = await todoService.getTodoById(id);
  return data;
};

export const getTodos = async (filters: string): Promise<GetTodosResponse> => {
  const { data } = await todoService.getAllTodos(filters);
  return data;
};
