import { apiUrls } from '../constants/apiUrls';
import {
  IBank,
  Income
} from '../types';

import api from './api';

const bankApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchBank: builder.query<IBank, Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.bank.root,
        params
      }),
      providesTags: [ 'Bank' ]
    }),
    createIncome: builder.mutation<Income, Partial<Income>>({
      query: ({ ...body }) => ({
        url: apiUrls.bank.incomes,
        method: 'POST',
        body
      }),
      invalidatesTags: [ 'Bank' ]
    }),
    deleteIncome: builder.mutation<IBank, number>({
      query: (id, ...params) => ({
        url: apiUrls.bank.incomeWithId(id),
        method: 'DELETE',
        params
      }),
      invalidatesTags: [ 'Bank' ]
    }),
    updateIncome: builder.mutation<Income, Partial<Income>>({
      query: ({ ...body }) => ({
        url: apiUrls.bank.incomeWithId(body.id as number),
        method: 'PUT',
        body
      }),
      invalidatesTags: [ 'Bank' ]
    })
  })
});

export const {
  useFetchBankQuery,
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation
} = bankApi;
