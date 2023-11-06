import { useMediaQuery } from 'react-responsive';
import { BREAKPOINT_KEYS } from '../modules/common/consts/app-keys.const';

export const useMedia = () => {
  const isMobileView = useMediaQuery({
    query: `(max-width: ${BREAKPOINT_KEYS.TABLET - 1}px)`
  });

  const isTabletView = useMediaQuery({
    query: `(min-width: ${BREAKPOINT_KEYS.TABLET}px) and (max-width: ${
      BREAKPOINT_KEYS.DESKTOP - 1
    }px)`
  });

  const isDesktopView = useMediaQuery({
    query: `(min-width: ${BREAKPOINT_KEYS.DESKTOP}px)`
  });

  return { isMobileView, isTabletView, isDesktopView };
};
