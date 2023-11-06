import React, { FC, useState } from 'react';
import { Box, Button, FormControlLabel, Modal, Switch, TableCell, TableRow } from '@mui/material';
import { ITodoWithId } from '../../../types/todo.types';
import { useDeleteTodo } from '../../../../../hooks/deleteTodo';
import { useCheckTodo } from '../../../../../hooks/checkTodo';
import { SPACES } from '../../../../theme';
import { TodoModal } from '../todoModal/todoModal';
import { useIsOwner } from '../../../../../hooks/isTodoOwner';

interface Props {
  todo: ITodoWithId;
}

export const TodoTableRow: FC<Props> = ({ todo }) => {
  const { updateTodo } = useCheckTodo();
  const isOwner = useIsOwner(todo.userId);

  const handleDeleteTodo = useDeleteTodo(todo.id);

  const handleUpdateTodoStatus = () => {
    if (isOwner) {
      updateTodo(todo, todo.isCompleted, 'isCompleted');
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <TableRow>
      <TableCell>{todo.title}</TableCell>
      <TableCell>{todo.description}</TableCell>
      <TableCell>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: SPACES.s }}
            onClick={handleOpen}
          >
            View
          </Button>
          <Button variant="outlined" color="error" onClick={handleDeleteTodo} disabled={!isOwner}>
            Delete
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="todo-modal-title"
            aria-describedby="todo-modal-description"
          >
            <div>
              <TodoModal todo={todo} onClose={handleClose} />
            </div>
          </Modal>

          <FormControlLabel
            control={<Switch checked={todo.isCompleted} disabled={!isOwner} />}
            label="Completed"
            labelPlacement="start"
            onClick={handleUpdateTodoStatus}
            disabled={!isOwner}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};
