import React, { FC } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import { ITodoWithId } from '../../../types/todo.types';
import { TodoTableRow } from '../todoTableRow/todoTableRow';
import { SPACES } from '../../../../theme';

interface Props {
  todos: ITodoWithId[];
}

export const TodoTable: FC<Props> = ({ todos }) => (
  <Container sx={{ p: 0, marginBottom: SPACES.l }}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Description
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }} textAlign="center">
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TodoTableRow todo={todo} key={todo.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Container>
);
