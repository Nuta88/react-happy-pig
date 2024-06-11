import { apiUrls } from '../constants/apiUrls';

import api from './api';

const tagApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchTag: builder.query<string[], Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.tags.root,
        params
      }),
      providesTags: [ 'Tags' ]
    }),
    createTag: builder.mutation<string[], string>({
      query: (id, ...params) => ({
        url: apiUrls.tags.rootWithId(id),
        method: 'POST',
        params
      }),
      invalidatesTags: [ 'Tags' ]
    }),
    deleteTag: builder.mutation<string[], string>({
      query: (id, ...params) => ({
        url: apiUrls.tags.rootWithId(id),
        method: 'DELETE',
        params
      }),
      invalidatesTags: [ 'Tags' ]
    })
  })
});

export const {
  useFetchTagQuery,
  useCreateTagMutation,
  useDeleteTagMutation
} = tagApi;
