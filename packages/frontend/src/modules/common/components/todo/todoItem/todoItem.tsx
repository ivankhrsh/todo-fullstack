import React, { FC, useState } from 'react';
import { Typography, Button, Box, FormControlLabel, Switch, Container, Modal } from '@mui/material';
import { SPACES } from '../../../../theme';
import { ITodoWithId } from '../../../types/todo.types';
import { TodoModal } from '../todoModal/todoModal';
import { useDeleteTodo } from '../../../../../hooks/deleteTodo';
import { useCheckTodo } from '../../../../../hooks/checkTodo';
import { useIsOwner } from '../../../../../hooks/isTodoOwner';
import { TODO } from '../../../../theme/sizes.const';
import { useMedia } from '../../../../../hooks/useMedia';

interface Props {
  todo: ITodoWithId;
}

export const TodoItem: FC<Props> = ({ todo }) => {
  const { updateTodo } = useCheckTodo();
  const handleDeleteTodo = useDeleteTodo(todo.id);
  const isOwner = useIsOwner(todo.userId);
  const { isTabletView } = useMedia();

  const handleUpdateTodoStatus = () => {
    if (isOwner) {
      updateTodo(todo, todo.isCompleted, 'isCompleted');
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container
      style={{
        marginBottom: SPACES.l
      }}
    >
      <Box display="flex" justifyContent="space-between" height={isTabletView ? TODO.m : TODO.auto}>
        <Box>
          <Typography variant="h5" gutterBottom>
            {todo.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {todo.description}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box mt={SPACES.s} display="flex" alignItems="center">
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
        </Box>

        <FormControlLabel
          control={<Switch checked={todo.isCompleted} disabled={!isOwner} />}
          label="Completed"
          labelPlacement="top"
          onClick={handleUpdateTodoStatus}
          disabled={!isOwner}
        />

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
      </Box>
    </Container>
  );
};
