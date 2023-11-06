import { FindManyOptions } from 'typeorm';
import { IFilters } from '../types/filters.type';
import { IUpdateTodo } from '../types/todos.type';
import { Todo } from '../entities/Todo';

export default class TodoService {
  async findAll(id: string, filters: IFilters, page: string) {
    const itemsPerPage = 5;
    let skip = 0;

    const where: FindManyOptions<Todo>['where'] = {};

    where.isPrivate = filters.isPrivate;

    if (String(filters.isPrivate) === 'true') {
      where.userId = id;
    }
    where.isCompleted = filters.isCompleted;

    if (page) {
      skip = (parseInt(page, 10) - 1) * itemsPerPage;
    }

    const [todos, totalCount] = await Promise.all([
      Todo.find({
        where,
        order: {
          id: 'DESC'
        },
        take: itemsPerPage,
        skip
      }),
      Todo.count({
        where
      })
    ]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
      todos,
      limit: totalPages
    };
  }

  async findTodoByTodoId(id: string) {
    const todo = await Todo.findOneBy({ id });
    return todo;
  }

  async findAllUserTodos(id: string) {
    const todos = await Todo.find({ where: { userId: id } });
    return todos;
  }

  async findAllPublic() {
    const todos = await Todo.find({ where: { isPrivate: false } });
    return todos;
  }

  async createTodo(payload: Todo, id: string) {
    const todo = Todo.create({ ...payload, userId: id });
    const result = await Todo.save(todo);
    return result;
  }

  async editById(id: string, payload: IUpdateTodo) {
    await Todo.update(id, payload);
    return Todo.findOneBy({ id });
  }

  async deleteById(id: string) {
    const result = await Todo.delete(id);
    return result;
  }
}
