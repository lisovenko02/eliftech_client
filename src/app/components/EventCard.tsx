import React, { useState } from 'react'
import { Event } from '../types/Event'
import { format } from 'date-fns'
import Link from 'next/link'

interface EventCardProps {
  event: Event
}

const EventCard = ({ event }: EventCardProps) => {
  const [isViewAll, setIsViewAll] = useState(false)

  return (
    <div className="flex flex-col gap-3 border rounded m-2 p-4 bg-[#404040] text-white shadow-lg justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{event.title}</h2>
          <p className="text-[#8C8C8C]">
            {format(event.eventDate, 'MMMM d, yyyy')}
          </p>
        </div>
        {isViewAll && (
          <>
            <p className="font-semibold text-[#B0B0B0]">
              <span className="font-bold text-gray-300">About event:</span>{' '}
              {event.description}
            </p>
            <p className="font-semibold text-[#B0B0B0]">
              <span className="font-bold text-gray-300">Organizer:</span>{' '}
              {event.organizer}
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <button
            className="text-[#B0B0B0] font-semibold"
            onClick={() => setIsViewAll(!isViewAll)}
          >
            {isViewAll ? 'Hide full info' : 'View all info'}
          </button>
        </div>

        <div className="flex justify-between">
          <Link
            href={`/register/${event._id}?eventName=${encodeURIComponent(
              event.title
            )}`}
            className="bg-[#4A90E2] text-white px-4 py-2 rounded hover:bg-[#357ABD]"
          >
            Register
          </Link>
          <Link
            href={`/members/${event._id}?eventName=${encodeURIComponent(
              event.title
            )}`}
            className="bg-[#4A90E2] text-white px-4 py-2 rounded hover:bg-[#357ABD]"
          >
            Members
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard
