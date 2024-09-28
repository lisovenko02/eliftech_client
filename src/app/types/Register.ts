export interface Register {
  _id?: string
  eventId?: string | string[]
  fullName: string
  email: string
  dateOfBirth: Date
  heardFrom: 'Social media' | 'Friends' | 'Found myself'
}

export interface PaginatedMembersResponse {
  members: Register[]
  totalPages: number
  currentPage: number
}
