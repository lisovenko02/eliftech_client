'use client'

import { useGetEventsQuery } from '@/state/api'
import EventCard from './components/EventCard'
import { useState } from 'react'
import PaginationPage from './components/PaginationPage'
import { ThreeDots } from 'react-loader-spinner'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('title')
  const [order, setOrder] = useState('asc')

  const { data, isLoading } = useGetEventsQuery({
    page: currentPage,
    sortBy,
    order,
  })

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newOrder] = e.target.value.split('-')
    setSortBy(newSortBy)
    setOrder(newOrder)
  }
  return isLoading ? (
    <ThreeDots width={60} height={60} />
  ) : (
    <div>
      <main>
        {/* HEADER */}
        <h2 className="text-2xl font-bold m-4">Events</h2>

        {/* SORT */}
        <div className="m-4">
          <label
            htmlFor="sort-select"
            className="mr-2 text-white text-xl font-bold"
          >
            Sort by:
          </label>
          <select
            id="sort-select"
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 transition duration-200 hover:border-blue-500 focus:outline-none focus:border-blue-500"
          >
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="eventDate-asc">Date (Oldest First)</option>
            <option value="eventDate-desc">Date (Newest First)</option>
            <option value="organizer-asc">Organizer (A-Z)</option>
            <option value="organizer-desc">Organizer (Z-A)</option>
          </select>
        </div>

        {/* EVENTCARD */}
        <div>
          <ul className="grid grid-cols-4">
            {data?.events &&
              data.events.map((event) => (
                <EventCard event={event} key={event._id} />
              ))}
          </ul>
        </div>

        {/* PAGINATION PAGE */}
        <div>
          <PaginationPage
            currentPage={currentPage}
            totalPages={data?.pagination.totalPages || 0}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  )
}
