import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { COLORS, SPACES } from '../../../../theme';
import { validationSchema } from '../../../schemas/todo.schema';
import { useAddTodo } from '../../../../../hooks/addTodo';

interface Props {
  onClose: () => void;
}

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

export const CreateTodoForm: FC<Props> = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const [isPrivate, setIsPrivate] = useState(true);
  const handleIsPrivate = () => setIsPrivate((prevState) => !prevState);

  const addTodo = useAddTodo();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const todoPayload = {
        title: values.title,
        description: values.description,
        isCompleted: false,
        isPrivate
      };
      addTodo(todoPayload);
      resetForm();
    }
  });

  return (
    <Box sx={style}>
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

      <Box display="flex" flexDirection="column">
        <FormControlLabel
          control={<Switch checked={isPrivate} />}
          label="Private"
          labelPlacement="start"
          onClick={handleIsPrivate}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" marginTop={SPACES.l}>
        <Button variant="outlined" onClick={handleClose}>
          Back
        </Button>
      </Box>
    </Box>
  );
};
