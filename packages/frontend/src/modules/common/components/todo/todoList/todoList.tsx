import React, { FC } from 'react';
import { Container } from '@mui/material';
import { TodoItem } from '../todoItem/todoItem';
import { ITodoWithId } from '../../../types/todo.types';

interface Props {
  todos: ITodoWithId[];
}

export const TodoList: FC<Props> = ({ todos }) => (
  <Container sx={{ p: 0 }}>
    {todos.map((todo) => (
      <TodoItem todo={todo} key={todo.id} />
    ))}
  </Container>
);
