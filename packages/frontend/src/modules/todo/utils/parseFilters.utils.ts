import { FilterType } from '../../common/types/todo.types';

export const parseFilters = (filter: FilterType, isCompleted: boolean, page: number = 1) => {
  const queryParts: string[] = [];

  if (filter !== FilterType.ALL) {
    queryParts.push(`isPrivate=${filter === FilterType.PRIVATE}`);
  }
  if (isCompleted) {
    queryParts.push('isCompleted=true');
  }
  queryParts.push(`page=${page}`);

  const query = queryParts.join('&');

  return query;
};
