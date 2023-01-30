import { apiUrls } from '../constants/apiUrls';

import api from './api';

const fundsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchFunds: builder.query({
      query: params => ({
        url: apiUrls.funds.root,
        params
      }),
      providesTags: [ 'Funds' ]
    }),
    fetchFund: builder.query({
      query: (id, ...params) => ({
        url: apiUrls.funds.rootWithId(id),
        params
      }),
      providesTags: [ 'Fund' ]
    }),
    createFund: builder.mutation({
      query: ({ ...body }) => ({
        url: apiUrls.funds.root,
        method: 'POST',
        body
      }),
      invalidatesTags: [ 'Funds' ]
    }),
    updateFund: builder.mutation({
      query: (body) => ({
        url: apiUrls.funds.rootWithId(body.id),
        method: 'PUT',
        body
      }),
      invalidatesTags: [ 'Fund' ]
    }),
    deleteFund: builder.mutation({
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
