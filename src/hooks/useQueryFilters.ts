import {
  useCallback,
  useState
} from 'react';

import { TQueryFilter } from '../types/query';
import { isObjectEmpty } from '../utils/object';

export interface IQueryFilters {
  query: Partial<TQueryFilter>;
  setQuery: (filter: Partial<TQueryFilter>) => void
}

export const useQueryFilters = (defaultValue: Partial<TQueryFilter> = {}): IQueryFilters => {
  const [ query, setQuery ] = useState(defaultValue);

  const handleSetQuery = useCallback((filter: Partial<TQueryFilter>) => {
    if (isObjectEmpty(filter)) {
      setQuery(filter);
      return;
    }

    setQuery(prevState => ({ ...prevState, ...filter }));
  }, []);

  return { query, setQuery: handleSetQuery };
};
