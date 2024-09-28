export interface Event {
  _id?: string
  title: string
  description: string
  eventDate: Date
  organizer: string
}

export interface Pagination {
  totalEvents: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface EventWithPagination {
  events: Event[]
  pagination: Pagination
}
