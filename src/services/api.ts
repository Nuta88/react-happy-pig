import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = process.env.REACT_APP_BASE_URL;

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: url
  }),
  tagTypes: [
    'Funds',
    'Fund',
    'Bank'
  ],
  endpoints: () => ({})
});

export default api;
