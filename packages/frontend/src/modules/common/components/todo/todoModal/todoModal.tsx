import React, { FC, useState } from 'react';
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { ITodoWithId } from '../../../types/todo.types';
import { COLORS, SPACES } from '../../../../theme';
import { useCheckTodo } from '../../../../../hooks/checkTodo';
import { validationSchema } from '../../../schemas/todo.schema';
import { useUpdateTodo } from '../../../../../hooks/updateTodo';
import { useIsOwner } from '../../../../../hooks/isTodoOwner';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: COLORS.black,
  boxShadow: 24,
  p: 4
};

interface Props {
  todo: ITodoWithId;
  onClose: () => void;
}

export const TodoModal: FC<Props> = ({ todo, onClose }) => {
  const handleEditTodo = useUpdateTodo();
  const { updateTodo: checkTodo } = useCheckTodo();
  const [isEditing, setIsEditing] = useState(false);
  const isOwner = useIsOwner(todo.userId);

  const handleUpdateTodoStatus = () => {
    if (isOwner) {
      checkTodo(todo, todo.isCompleted, 'isCompleted');
    }
  };
  const handleUpdateTodoPrivacy = () => {
    if (isOwner) {
      checkTodo(todo, todo.isPrivate, 'isPrivate');
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleEdit = () => {
    setIsEditing((prevState: boolean) => !prevState);
  };

  const formik = useFormik({
    initialValues: {
      title: todo.title,
      description: todo.description
    },
    validationSchema,
    onSubmit: (values) => {
      const todoPayload = {
        id: todo.id,
        title: values.title,
        description: values.description,
        isCompleted: todo.isCompleted,
        isPrivate: todo.isPrivate
      };
      handleEditTodo(todoPayload);
      handleEdit();
    }
  });

  return (
    <Box sx={style}>
      {!isEditing && (
        <Box marginBottom={SPACES.l}>
          <Typography variant="h5" gutterBottom>
            {todo.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {todo.description}
          </Typography>
        </Box>
      )}

      {isEditing && (
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="column" gap={SPACES.m} mb={SPACES.s}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              type="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
            <Button color="success" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Box>
        </form>
      )}

      <Box display="flex" flexDirection="column">
        <FormControlLabel
          control={<Switch checked={todo.isCompleted} disabled={!isOwner} />}
          label="Completed"
          labelPlacement="start"
          onClick={handleUpdateTodoStatus}
          disabled={!isOwner}
        />
        <FormControlLabel
          control={<Switch checked={todo.isPrivate} disabled={!isOwner} />}
          label="Private"
          labelPlacement="start"
          onClick={handleUpdateTodoPrivacy}
          disabled={!isOwner}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop={SPACES.l}>
        <Button variant="outlined" onClick={handleClose}>
          Back
        </Button>

        {!isEditing && (
          <Button variant="outlined" color="primary" onClick={handleEdit} disabled={!isOwner}>
            Edit
          </Button>
        )}

        {isEditing && (
          <Button variant="outlined" color="error" onClick={handleEdit}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};
