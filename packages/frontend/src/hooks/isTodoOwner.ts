import { STORAGE_KEYS } from '../modules/common/consts/app-keys.const';

export const useIsOwner = (todoOwnerId: string) => {
  const userId = localStorage.getItem(STORAGE_KEYS.ID);

  return userId === todoOwnerId;
};
