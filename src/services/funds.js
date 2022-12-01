import api from './api';

import { apiUrls } from '../constants/apiUrls';

const fundsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchFunds: builder.query({
      query: params => ({
        url: apiUrls.funds.root,
        params
      }),
      providesTags: ['Funds']
    })
  })
});

export const { useFetchFundsQuery } = fundsApi;