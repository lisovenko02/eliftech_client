'use client'

import { Register } from '@/app/types/Register'
import { useGetEventMembersQuery } from '@/state/api'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ThreeDots } from 'react-loader-spinner'

const Members = () => {
  const router = useRouter()
  const params = useParams()
  const eventId = Array.isArray(params.id) ? params.id[0] : params.id

  // ALL FOR HEADER
  const searchParams = useSearchParams()
  const eventName = searchParams.get('eventName')

  // ALL FOR INFINITY SCROLL
  const [page, setPage] = useState<number>(1)
  const [members, setMembers] = useState<Register[]>([])
  const [hasMore, setHasMore] = useState(true)
  const limit = 10

  const { data, isLoading } = useGetEventMembersQuery(
    { eventId, page, limit },
    { skip: !eventId }
  )

  useEffect(() => {
    if (data?.members) {
      setMembers((prevMembers) => [...prevMembers, ...data.members])
      setHasMore(data.members.length === limit)
    }
  }, [data])

  const fetchMoreMembers = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return isLoading ? (
    <ThreeDots height="60" width="60" color="#fff" />
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-[#2d2d2d]">
      <div className="w-full max-w-4xl bg-[#404040] p-8 rounded-lg shadow-lg relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-[#333] text-white p-2 rounded-full hover:bg-[#555] transition-all"
        >
          <FaArrowLeft size={30} />
        </button>

        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          {eventName} members
        </h1>

        <InfiniteScroll
          dataLength={members.length}
          next={fetchMoreMembers}
          hasMore={hasMore}
          loader={<ThreeDots height="60" width="60" />}
        >
          <ul className="grid grid-cols-2 gap-4">
            {members && members.length > 0 ? (
              members.map((member: Register) => (
                <li
                  key={member._id}
                  className="bg-[#333] p-4 rounded-lg shadow-md hover:bg-[#555] transition-all"
                >
                  <h2 className="text-xl font-semibold text-white">
                    {member.fullName}
                  </h2>
                  <p className="text-gray-300">{member.email}</p>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-400">
                No members registered for this event
              </li>
            )}
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Members
