import React, { useState } from 'react';
import { ButtonGroup, Button, Container, Box, Modal, Alert } from '@mui/material';
import { SPACES } from '../../../../theme';
import { TodoList } from '../todoList/todoList';
import { CreateTodoForm } from '../createTodoForm/createTodoForm';
import { useMedia } from '../../../../../hooks/useMedia';
import { TodoSlider } from '../todoSlider/todoSlider';
import { useGetTodos } from '../../../../../hooks/getTodos';
import { TodoTable } from '../todoTable/TodoTable';
import { Loader } from '../../loader/Loader';
import { UserProfile } from '../../user/userProfile/UserProfile';
import { FilterType, IsCompleted } from '../../../types/todo.types';
import { parseFilters } from '../../../../todo/utils/parseFilters.utils';
import { PageButtons } from '../pagesButtons/pagesButtons';

const TodoContainer = () => {
  const [openAddTodo, setOpenAddTodo] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(FilterType.ALL);
  const [selectedIsCompleted, setSelectedIsCompleted] = useState(false);
  const { isMobileView, isTabletView, isDesktopView } = useMedia();
  const handleOpenAddTodo = () => setOpenAddTodo(true);
  const handleCloseAddTodo = () => setOpenAddTodo(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);
  const [page, setPage] = useState(1);
  const handlePrevPage = () => {
    setPage((prevState) => prevState - 1);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleAnyPage = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (filter: FilterType) => {
    setSelectedFilter(filter);
    setPage(1);
  };

  const handleSwitchSelectedIsCompleted = () => {
    setSelectedIsCompleted((prevState) => !prevState);
    setPage(1);
  };

  const getButtonVariant = (filter: FilterType) => {
    if (selectedFilter === filter) {
      return 'contained';
    }
    return 'outlined';
  };

  const filters = parseFilters(selectedFilter, selectedIsCompleted, page);

  const { todos, limit, isLoading, isError } = useGetTodos(filters);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container
      style={{
        marginTop: SPACES.l,
        gap: SPACES.s
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: SPACES.l
        }}
      >
        <Button size="medium" variant="outlined" color="success" onClick={handleOpenAddTodo}>
          Add todo
        </Button>
        <Button size="medium" variant="outlined" onClick={handleOpenProfile}>
          My Profile
        </Button>
      </Box>
      <Modal
        open={openAddTodo}
        onClose={handleCloseAddTodo}
        aria-labelledby="todo-modal-title"
        aria-describedby="todo-modal-description"
      >
        <div>
          <CreateTodoForm onClose={handleCloseAddTodo} />
        </div>
      </Modal>

      <Modal
        open={openProfile}
        onClose={handleCloseProfile}
        aria-labelledby="user-profile"
        aria-describedby="user-profile"
      >
        <div>
          <UserProfile onClose={handleCloseProfile} />
        </div>
      </Modal>
      <ButtonGroup
        variant="outlined"
        aria-label="filter buttons group"
        style={{ marginBottom: SPACES.l, display: 'flex', justifyContent: 'center' }}
      >
        <Button
          variant={getButtonVariant(FilterType.ALL)}
          size="small"
          onClick={() => handleFilterChange(FilterType.ALL)}
        >
          {FilterType.ALL}
        </Button>
        <Button
          variant={getButtonVariant(FilterType.PRIVATE)}
          size="small"
          onClick={() => handleFilterChange(FilterType.PRIVATE)}
        >
          {FilterType.PRIVATE}
        </Button>
        <Button
          variant={getButtonVariant(FilterType.PUBLIC)}
          size="small"
          onClick={() => handleFilterChange(FilterType.PUBLIC)}
        >
          {FilterType.PUBLIC}
        </Button>
        <Button
          variant={selectedIsCompleted ? 'contained' : 'outlined'}
          size="small"
          onClick={handleSwitchSelectedIsCompleted}
        >
          {IsCompleted.COMPLETED}
        </Button>
      </ButtonGroup>

      {isError && <Alert severity="error">Todos loading error. Please try again later</Alert>}

      {todos && isMobileView && <TodoList todos={todos} />}
      {todos && isTabletView && (
        <TodoSlider
          todos={todos}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          page={page}
          limit={limit}
          filters={filters}
          handleAnyPage={handleAnyPage}
        />
      )}
      {todos && isDesktopView && <TodoTable todos={todos} />}

      {todos && !isTabletView && (
        <PageButtons
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          page={page}
          limit={limit}
          handleAnyPage={handleAnyPage}
        />
      )}
    </Container>
  );
};

export default TodoContainer;
