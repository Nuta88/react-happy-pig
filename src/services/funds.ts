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
        url: apiUrls.funds.details(id),
        params
      }),
      providesTags: [ 'Fund' ]
    }),
    createFund: builder.mutation({
      query: ({ ...body }) => ({
        url: apiUrls.funds.create,
        method: 'POST',
        body
      }),
      invalidatesTags: [ 'Funds' ]
    }),
    updateFund: builder.mutation({
      query: (body) => ({
        url: apiUrls.funds.update(body.id),
        method: 'PUT',
        body
      }),
      invalidatesTags: [ 'Fund' ]
    }),
    deleteFund: builder.mutation({
      query: (id, ...params) => ({
        url: apiUrls.funds.delete(id),
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
