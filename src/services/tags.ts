import { apiUrls } from '../constants/apiUrls';
import {
  Association,
  CreateAssociation
} from '../types/tag';

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
    }),
    fetchTagAssociations: builder.query<Association[], Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.tags.associations,
        params
      }),
      providesTags: [ 'TagAssociations' ]
    }),
    createTagAssociation: builder.mutation<Association[], CreateAssociation>({
      query: body => ({
        url: apiUrls.tags.associations,
        method: 'POST',
        body
      }),
      invalidatesTags: [ 'TagAssociations' ]
    }),
    deleteTagAssociation: builder.mutation<string[], CreateAssociation>({
      query: body => ({
        url: apiUrls.tags.associations,
        method: 'DELETE',
        body
      }),
      invalidatesTags: [ 'TagAssociations' ]
    })
  })
});

export const {
  useFetchTagQuery,
  useFetchTagAssociationsQuery,
  useCreateTagMutation,
  useDeleteTagMutation,
  useCreateTagAssociationMutation,
  useDeleteTagAssociationMutation
} = tagApi;
