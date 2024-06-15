import { apiUrls } from '../constants/apiUrls';

import api from './api';

const statisticApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchStatistics: builder.query<any, Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.statistics.root,
        params
      }),
      providesTags: [ 'Statistics' ]
    })
  })
});

export const {
  useFetchStatisticsQuery
} = statisticApi;
