import { EventWithPagination } from '@/app/types/Event'
import { PaginatedMembersResponse, Register } from '@/app/types/Register'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: 'api',
  tagTypes: ['Events', 'Members'],
  endpoints: (build) => ({
    getEvents: build.query<
      EventWithPagination,
      { page: number; sortBy: string; order: string }
    >({
      query: ({ page, sortBy, order }) =>
        `/events?page=${page}&sortBy=${sortBy}&order=${order}`,
      providesTags: ['Events'],
    }),
    getEventMembers: build.query<
      PaginatedMembersResponse,
      { eventId: string; page: number; limit: number }
    >({
      query: ({ eventId, page, limit }) =>
        `/events/${eventId}?page=${page}&limit=${limit}`,
      providesTags: ['Members'],
    }),
    registerToEvent: build.mutation<string, Register>({
      query: (credentials) => ({
        url: `/register/${credentials.eventId}`,
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const {
  useGetEventsQuery,
  useRegisterToEventMutation,
  useGetEventMembersQuery,
} = api
