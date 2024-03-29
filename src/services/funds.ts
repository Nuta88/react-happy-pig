import { apiUrls } from '../constants/apiUrls';
import { Fund } from '../types';

import api from './api';

const fundsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchFunds: builder.query<Fund[], Record<string, any> | undefined>({
      query: () => ({
        url: apiUrls.funds.root
      }),
      providesTags: [ 'Funds' ]
    }),
    fetchFund: builder.query<Fund, number>({
      query: (id, ...params) => ({
        url: apiUrls.funds.rootWithId(id),
        params
      }),
      providesTags: [ 'Fund' ]
    }),
    createFund: builder.mutation<Fund, Partial<Fund>>({
      query: ({ ...body }) => ({
        url: apiUrls.funds.root,
        method: 'POST',
        body
      }),
      invalidatesTags: [ 'Funds' ]
    }),
    updateFund: builder.mutation<Fund, Partial<Fund>>({
      query: (body) => ({
        url: apiUrls.funds.rootWithId(body.id as number),
        method: 'PUT',
        body
      }),
      invalidatesTags: [ 'Fund' ]
    }),
    closeFund: builder.mutation<Fund, number>({
      query: (id, ...params) => ({
        url: apiUrls.funds.close(id),
        method: 'POST',
        params
      }),
      invalidatesTags: [ 'Funds' ]
    })
  })
});

export const {
  useFetchFundsQuery,
  useFetchFundQuery,
  useCreateFundMutation,
  useCloseFundMutation,
  useUpdateFundMutation
} = fundsApi;
