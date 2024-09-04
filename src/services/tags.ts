import { apiUrls } from '../constants/apiUrls';
import { useQueryNotification } from '../hooks';
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
    fetchTagAssociations: builder.query<Association[], Record<string, any> | undefined>({
      query: params => ({
        url: apiUrls.tags.associations,
        params
      }),
      providesTags: [ 'TagAssociations' ]
    }),
    createTag: builder.mutation<string[], string>({
      query: (id, ...params) => ({
        url: apiUrls.tags.rootWithId(id),
        method: 'POST',
        params
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications(`Tag "${args}" was created successfully!`, `Tag "${args}" was not created!`);
      },
      invalidatesTags: [ 'Tags' ]
    }),
    createTagAssociation: builder.mutation<Association[], CreateAssociation>({
      query: body => ({
        url: apiUrls.tags.associations,
        method: 'POST',
        body
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications(
          'Tag Association was created successfully!',
          'Tag Association was not created!');
      },
      invalidatesTags: [ 'TagAssociations' ]
    }),
    deleteTag: builder.mutation<string[], string>({
      query: (id, ...params) => ({
        url: apiUrls.tags.rootWithId(id),
        method: 'DELETE',
        params
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications(`Tag "${args}" was deleted successfully!`, `Tag "${args}" was not deleted!`);
      },
      invalidatesTags: [ 'Tags' ]
    }),
    deleteTagAssociation: builder.mutation<string[], CreateAssociation>({
      query: body => ({
        url: apiUrls.tags.associations,
        method: 'DELETE',
        body
      }),
      async onQueryStarted (args, { queryFulfilled }) {
        const { queryNotifications } = useQueryNotification(queryFulfilled);

        await queryNotifications(
          'Tag Association was deleted successfully!',
          'Tag Association was not deleted!');
      },
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
