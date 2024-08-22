import { apiUrls } from '../constants/apiUrls';
import { BillTracker } from '../types/billtracker';

import api from './api';

const billTrackerApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchBillTracker: builder.query<BillTracker, Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.billTracker.root,
        params
      }),
      providesTags: [ 'BillTracker' ]
    }),
    createBillTracker: builder.mutation<BillTracker, Partial<BillTracker>>({
      query: ({ ...body }) => ({
        url: apiUrls.billTracker.root,
        method: 'POST',
        body
      }),
      invalidatesTags: [ 'BillTracker' ]
    }),
    deleteBillTracker: builder.mutation<string[], number>({
      query: (id, ...params) => ({
        url: apiUrls.billTracker.rootWithId(id),
        method: 'DELETE',
        params
      }),
      invalidatesTags: [ 'BillTracker' ]
    })
  })
});

export const {
  useFetchBillTrackerQuery,
  useCreateBillTrackerMutation,
  useDeleteBillTrackerMutation
} = billTrackerApi;
