import React, { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Virtual, Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { ITodoWithId } from '../../../types/todo.types';
import { TodoItem } from '../todoItem/todoItem';
import { SPACES } from '../../../../theme';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { PageButtons } from '../pagesButtons/pagesButtons';
// import { useGetMoreTodos } from '../../../../../hooks/getMoreTodos';

interface Props {
  todos: ITodoWithId[];
  page: number;
  limit: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleAnyPage: (page: number) => void;
  filters: string;
}

export const TodoSlider: FC<Props> = ({
  todos,
  handlePrevPage,
  handleNextPage,
  handleAnyPage,
  limit,
  page,
  filters
}) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  const slideTo = (index: number) => {
    if (swiperRef) {
      swiperRef.slideTo(index - 1, 0);
    }
  };

  useEffect(() => {
    slideTo(1);
  }, [filters]);

  const handlePrevPageSlider = () => {
    handlePrevPage();
    slideTo(1);
  };

  const handleNextPageSlider = () => {
    handleNextPage();
    slideTo(1);
  };

  // const { newTodos, loadMore } = useGetMoreTodos(filters, todos);
  return (
    <>
      <Box style={{ margin: 0, padding: 0, marginBottom: SPACES.m }}>
        <Swiper
          style={{ left: '5px' }}
          onSwiper={setSwiperRef}
          modules={[Virtual, Pagination]}
          slidesPerView={1.2}
          centeredSlides={false}
          spaceBetween={5}
          pagination={{
            clickable: true
          }}
          // onReachEnd={() => {
          //   if (page < limit) {
          //     changePage();
          //     loadMore();
          //   }
          // }}
          virtual
        >
          {todos.map((todo) => (
            <SwiperSlide key={todo.id}>
              <Box border="1px solid" pt={SPACES.m}>
                <TodoItem todo={todo} />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <PageButtons
        handlePrevPage={handlePrevPageSlider}
        handleNextPage={handleNextPageSlider}
        page={page}
        limit={limit}
        handleAnyPage={handleAnyPage}
      />
    </>
  );
};
