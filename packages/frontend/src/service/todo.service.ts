import { ITodo } from '../modules/common/types/todo.types';
import { HttpService } from './http.service';

class TodoService extends HttpService {
  private url: string | undefined;

  constructor(url = 'todos') {
    super();
    this.url = url;
  }

  getAllTodos(filters: string) {
    const url = filters ? `${this.url}/?${filters}` : this.url;
    return this.get({ url });
  }

  getTodoById(id: string) {
    return this.get({ url: `${this.url}/${id}` });
  }

  updateTodo({ id, ...data }: ITodo) {
    return this.put({ url: `${this.url}/${id}`, data });
  }

  addTodo({ ...data }: ITodo) {
    return this.post({ url: `${this.url}`, data });
  }

  deleteTodo(id: string) {
    return this.delete({ url: `${this.url}/${id}` });
  }
}

export const todoService = new TodoService();
