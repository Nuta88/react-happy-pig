import { apiUrls } from '../constants/apiUrls';
import { IBank } from '../types';

import api from './api';

const bankApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchBank: builder.query<IBank, Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.bank.root,
        params
      }),
      providesTags: [ 'Bank' ]
    })
  })
});

export const {
  useFetchBankQuery
} = bankApi;
