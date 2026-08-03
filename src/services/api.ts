import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../constants/apiUrls';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  tagTypes: [
    'Funds',
    'Fund',
    'Expense',
    'Expenses',
    'Bank',
    'Tags',
    'TagAssociations',
    'Statistics',
    'BillTracker'
  ],
  endpoints: () => ({})
});

export default api;
