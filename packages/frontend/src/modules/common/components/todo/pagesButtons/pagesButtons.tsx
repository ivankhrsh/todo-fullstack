import React, { FC } from 'react';
import { Box, Button } from '@mui/material';
import { SPACES } from '../../../../theme';
import { useMedia } from '../../../../../hooks/useMedia';

interface Props {
  page: number;
  limit: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  handleAnyPage: (page: number) => void;
}

export const PageButtons: FC<Props> = ({
  page,
  handlePrevPage,
  handleNextPage,
  limit,
  handleAnyPage
}) => {
  const { isMobileView, isTabletView, isDesktopView } = useMedia();
  const maxPages = 10;
  const startPage = Math.max(1, Math.min(page - Math.floor(maxPages / 2), limit - maxPages + 1));
  const endPage = Math.min(limit, startPage + maxPages - 1);

  const numbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <Box display="flex" justifyContent="center" marginBottom={SPACES.l} gap={SPACES.m}>
      <Button
        variant="contained"
        onClick={handlePrevPage}
        disabled={page === 1}
        color="primary"
        aria-label="previous page"
      >
        {'<'}
      </Button>

      {isMobileView && (
        <Button variant="outlined" color="primary" aria-label="current page">
          {page} / {limit}
        </Button>
      )}

      {(isTabletView || isDesktopView) &&
        numbers.map((number) => (
          <Button
            key={number}
            variant="outlined"
            color="primary"
            aria-label={`Button ${number}`}
            disabled={page === number}
            onClick={() => handleAnyPage(number)}
          >
            {number}
          </Button>
        ))}

      <Button
        variant="contained"
        onClick={handleNextPage}
        disabled={page >= limit}
        color="primary"
        aria-label="next page"
      >
        {'>'}
      </Button>
    </Box>
  );
};
