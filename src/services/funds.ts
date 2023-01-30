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
    deleteFund: builder.mutation<Fund, number>({
      query: (id, ...params) => ({
        url: apiUrls.funds.rootWithId(id),
        method: 'DELETE',
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
  useDeleteFundMutation,
  useUpdateFundMutation
} = fundsApi;
