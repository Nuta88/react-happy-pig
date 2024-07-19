import { apiUrls } from '../constants/apiUrls';
import { IStatistics } from '../types/statistics';

import api from './api';

const statisticApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchStatistics: builder.query<IStatistics, Record<string, any> | undefined>({
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
