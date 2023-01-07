import api from './api';

import { apiUrls } from '../constants/apiUrls';

const bankApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchBank: builder.query({
      query: params => ({
        url: apiUrls.bank.root,
        params
      }),
      providesTags: ['Bank']
    })
  })
});

export const {
  useFetchBankQuery
} = bankApi;