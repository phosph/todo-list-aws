import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://prvor2e1gg.execute-api.us-east-1.amazonaws.com/prod/';

export interface Task {
  id: string;
  content: string;
  status: boolean;
}

export type INewItemInput = string;

export const listApi = createApi({
  reducerPath: 'listApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getList: builder.query<Task[], void>({
      query: () => '',
      providesTags: (result) => [
        { type: 'Task', id: 'LIST' },
        ...(result?.map(({ id }) => ({ type: 'Task', id } as const)) ?? []),
      ],
    }),
    addNewTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: 'item',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    updateTask: builder.mutation<
      Task,
      Pick<Task, 'id'> & Partial<Omit<Task, 'id'>>
    >({
      query: (body) => ({
        url: `item/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
  }),
});

export const { useGetListQuery, useAddNewTaskMutation, useUpdateTaskMutation } =
  listApi;
