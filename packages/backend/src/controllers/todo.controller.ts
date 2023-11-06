import { Response, Request } from 'express';
import { IFilters } from 'src/types/filters.type';
import TodoService from '../services/todo.service';
import { User } from '../entities/User';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async createTodo(req: Request, res: Response) {
    const { id: userId } = req.user as User;
    const todo = await this.todoService.createTodo(req.body, userId);
    res.send(todo);
  }

  async getAllAvailableTodos(req: Request, res: Response) {
    const { id: userId } = req.user as User;
    const { page, isPrivate, isCompleted } = req.query;
    const filters = {
      isPrivate,
      isCompleted
    };

    const todos = await this.todoService.findAll(userId, filters as IFilters, page as string);
    res.send(todos);
  }

  async getPublicTodos(_: Request, res: Response) {
    const todos = await this.todoService.findAllPublic();
    res.send(todos);
  }

  async getTodo(req: Request, res: Response) {
    const { id: todoId } = req.params;
    const { id: userId } = req.user as User;
    const todo = await this.todoService.findTodoByTodoId(todoId);

    if (todo?.userId !== userId) {
      res.sendStatus(403);
    }

    res.send(todo);
  }

  async deleteTodo(req: Request, res: Response) {
    const { id: todoId } = req.params;
    const { id: userId } = req.user as User;
    const todo = await this.todoService.findTodoByTodoId(todoId);

    if (todo?.userId !== userId) {
      res.sendStatus(403);
    }

    await this.todoService.deleteById(todoId);
    res.sendStatus(204);
  }

  async updateTodo(req: Request, res: Response) {
    const { id: todoId } = req.params;
    const { id: userId } = req.user as User;
    const todo = await this.todoService.findTodoByTodoId(todoId);

    if (todo?.userId !== userId) {
      res.sendStatus(403);
    }

    const updatedTodo = await this.todoService.editById(todoId, req.body);
    res.send(updatedTodo);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
