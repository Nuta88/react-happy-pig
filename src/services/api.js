import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_BASE_URL,
  }),
  tagTypes: [
    'Funds'
  ],
  endpoints: () => ({})
});

export default api;