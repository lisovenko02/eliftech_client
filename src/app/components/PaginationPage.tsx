import React from 'react'

interface PaginationProps {
  currentPage: number
  onPageChange: (page: number) => void
  totalPages: number
}

const PaginationPage = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    onPageChange(page)
  }
  const pagesToShow = 3

  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2))
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1)

  return (
    <div className="flex justify-center my-4">
      {startPage > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="mx-1 px-3 py-1 rounded bg-gray-600"
          >
            1
          </button>
          {startPage > 2 && <span className="mx-1">...</span>}
        </>
      )}

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      ).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`mx-1 px-3 py-1 rounded text-white ${
            currentPage === page ? 'bg-blue-500' : 'bg-gray-600'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="mx-1">...</span>}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="mx-1 px-3 py-1 rounded bg-gray-600"
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  )
}

export default PaginationPage
