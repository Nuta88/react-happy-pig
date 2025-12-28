import { apiUrls } from '../constants/apiUrls';
import { IncomeSource } from '../constants/bank';
import { useQueryNotification } from '../hooks';
import {
  IBank,
  Income
} from '../types';
import {
  ILoan,
  TLoanCreate
} from '../types/bank';

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
    fetchIncomes: builder.query<Income[], Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.bank.incomes,
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
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications(
          `Income "${args?.source as keyof typeof IncomeSource}" was created successfully!`,
          `Income "${args?.source as keyof typeof IncomeSource}" was not created!`
        );
      },
      invalidatesTags: [ 'Bank' ]
    }),
    deleteIncome: builder.mutation<IBank, { id: number; source: string }>({
      query: (body, ...params) => ({
        url: apiUrls.bank.incomeWithId(body.id),
        method: 'DELETE',
        params
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications(
          `Income "${args.source.toLocaleLowerCase()}" was deleted successfully!`,
          `Income "${args.source.toLocaleLowerCase()}" was not deleted!`
        );
      },
      invalidatesTags: [ 'Bank' ]
    }),
    updateIncome: builder.mutation<Income, Partial<Income>>({
      query: ({ ...body }) => ({
        url: apiUrls.bank.incomeWithId(body.id as number),
        method: 'PUT',
        body
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications(
          `Income "${args?.source as keyof typeof IncomeSource}" was edited successfully!`,
          `Income "${args?.source as keyof typeof IncomeSource}" was not edited!`
        );
      },
      invalidatesTags: [ 'Bank' ]
    }),
    createLoan: builder.mutation<TLoanCreate, Partial<ILoan>>({
      query: ({ ...body }) => ({
        url: apiUrls.bank.loans,
        method: 'POST',
        body
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications(
          'loan was created successfully',
          'loan was not created!'
        );
      },
      invalidatesTags: [ 'Bank' ]
    }),
    fetchLoans: builder.query<ILoan[], Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.bank.activeLoans,
        params
      }),
      providesTags: [ 'Bank' ]
    }),
    fetchLoan: builder.query<ILoan, number>({
      query: (id, ...params) => ({
        url: apiUrls.bank.loanWithId(id),
        params
      }),
      providesTags: [ 'Bank' ]
    }),
    closeLoan: builder.mutation<ILoan, { id: number }>({
      query: (body, ...params) => ({
        url: apiUrls.bank.closeLoan(body.id),
        method: 'PUT',
        params
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications(
          'Loan was closed successfully!',
          'Loan was not closed!'
        );
      },
      invalidatesTags: [ 'Bank' ]
    }),
    updateLoan: builder.mutation<ILoan, Partial<ILoan>>({
      query: ({ ...body }) => ({
        url: apiUrls.bank.loanWithId(body.id as number),
        method: 'PUT',
        body
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications(
          'Loan was edited successfully!',
          'Loan was not edited!'
        );
      },
      invalidatesTags: [ 'Bank' ]
    })
  })
});

export const {
  useFetchBankQuery,
  useFetchIncomesQuery,
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
  useCreateLoanMutation,
  useFetchLoansQuery,
  useFetchLoanQuery,
  useCloseLoanMutation,
  useUpdateLoanMutation
} = bankApi;
