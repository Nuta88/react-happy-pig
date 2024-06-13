export interface GeneralQueryProps {
  isUninitialized: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: any
}

export interface MutationResult extends GeneralQueryProps {
  reset: () => void
}

export interface TQueryFilter {
  date: string
}
