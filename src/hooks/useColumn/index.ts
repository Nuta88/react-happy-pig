import { TQueryFilter } from '../../types/query';

import { useDateFilter } from './useDateFilter';

export const useColumn = (onFilter: (filter: Partial<TQueryFilter>) => void): any => {
  const { getDateFilterProps } = useDateFilter(onFilter);

  return { getDateFilterProps };
};
