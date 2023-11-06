import { Router } from 'express';

import validationSchemes from '../../validators/validation.schemas';
import { Todo } from '../../entities/Todo';
import validator from '../../validators/generic.validator';
import todoController from '../../controllers/todo.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const todosRouter: Router = Router();

todosRouter.use(authenticate('jwt'));

// get all todos
todosRouter.get('', todoController.getAllAvailableTodos.bind(todoController));

// get public todos
todosRouter.get('/public', todoController.getPublicTodos.bind(todoController));

// get one todo by id
todosRouter.get(
  '/:id',
  validator.isExist(Todo).bind(validator),
  todoController.getTodo.bind(todoController)
);

// create todo
todosRouter.post(
  '/',
  validator.isBodyValid(validationSchemes.todo).bind(validator),
  todoController.createTodo.bind(todoController)
);

// edit todo by id, mark as complete
todosRouter.put(
  '/:id',
  validator.isBodyValid(validationSchemes.todoUpdate).bind(validator),
  validator.isExist(Todo).bind(validator),
  todoController.updateTodo.bind(todoController)
);

// delete todo by id
todosRouter.delete(
  '/:id',
  validator.isExist(Todo).bind(validator),
  todoController.deleteTodo.bind(todoController)
);

export default todosRouter;
