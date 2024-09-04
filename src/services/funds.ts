import { apiUrls } from '../constants/apiUrls';
import { useQueryNotification } from '../hooks';
import {
  Expense,
  Fund
} from '../types';
import {
  IMovingExpense,
  Transfer
} from '../types/fund';

import api from './api';

const fundsApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchFunds: builder.query<Fund[], Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.funds.root,
        params
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
    fetchExpenses: builder.query<Expense[], Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.funds.expenses,
        params
      }),
      providesTags: [ 'Expenses' ]
    }),
    createFund: builder.mutation<Fund, Partial<Fund>>({
      query: ({ ...body }) => ({
        url: apiUrls.funds.root,
        method: 'POST',
        body
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);
        const { name = '' } = args;

        await queryNotifications(
          `Fund "${name}" was created successfully!`,
          `Fund "${name}" was not created!`
        );
      },
      invalidatesTags: [ 'Funds' ]
    }),
    updateFund: builder.mutation<Fund, Partial<Fund>>({
      query: (body) => ({
        url: apiUrls.funds.rootWithId(body.id as number),
        method: 'PUT',
        body
      }),
      invalidatesTags: [ 'Fund', 'Funds', 'BillTracker' ]
    }),
    transaction: builder.mutation<Fund, Transfer>({
      query: (body) => ({
        url: apiUrls.funds.transfer(body.fundId),
        method: 'PUT',
        body
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications('The transaction was created successfully!', 'The transaction was not created!');
      },
      invalidatesTags: [ 'Fund' ]
    }),
    closeFund: builder.mutation<Fund, { id: number; name: string }>({
      query: (body, ...params) => ({
        url: apiUrls.funds.close(body.id),
        method: 'POST',
        params
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications(
          `Fund "${args.name}" was closed successfully!`,
          `Fund "${args.name}" was not closed!`
        );
      },
      invalidatesTags: [ 'Funds' ]
    }),
    movingExpense: builder.mutation<any, IMovingExpense>({
      query: (body) => ({
        url: apiUrls.funds.moveExpense(body.newFundId, body.expenseId),
        method: 'PUT',
        body
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications('Expense was moved successfully!', 'The expense was not moved!');
      },
      invalidatesTags: [ 'Fund' ]
    })
  })
});

export const {
  useFetchFundsQuery,
  useFetchFundQuery,
  useFetchExpensesQuery,
  useCreateFundMutation,
  useCloseFundMutation,
  useUpdateFundMutation,
  useTransactionMutation,
  useMovingExpenseMutation
} = fundsApi;
