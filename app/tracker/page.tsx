'use client'
// Import necessary dependencies
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

// Define type for cryptocurrency data
type Crypto = {
  rank: string
  name: string
  priceUsd: string
  marketCapUsd: string
  supply: string
  volumeUsd24Hr: string
}

// Main component for tracking cryptocurrency prices
function PriceTracker() {
  // State for pagination and search
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const rowsPerPage = 5

  // Fetch cryptocurrency data using React Query
  const { data, isLoading, refetch, isFetching } = useQuery<{ data: Crypto[] }>({
    queryKey: ['cryptoData'],
    queryFn: async () => {
      const response = await axios.get('https://api.coincap.io/v2/assets')
      return response.data
    },
  })

  // Extract crypto data from response or use empty array as fallback
  const cryptoData = data?.data || []

  // Filter data based on search term (case-insensitive)
  const filteredData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate pagination values
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage)

  // Handlers for pagination
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))

  // Utility function to format large numbers
  const formatNumber = (value: number) =>
    new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value)

  return (
    <div className="flex flex-col items-center p-2 md:p-4 max-w-full md:max-w-7xl mx-auto">
      {/* Search and refresh controls */}
      <div className="w-full flex flex-col gap-2 mb-4 md:flex-row md:justify-between md:gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1) // Reset to the first page when searching
          }}
          className="p-2 border rounded w-full"
        />

        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 flex items-center justify-center gap-2"
        >
          {isFetching ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Refreshing...</span>
            </>
          ) : (
            'Refresh Data'
          )}
        </button>
      </div>

      {/* Loading spinner or data table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-48 md:h-64">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Cryptocurrency data table */}
          <div className="w-full overflow-x-auto -mx-2 px-2">
            <table className="w-full text-sm md:text-base text-center min-w-[320px] md:min-w-[800px]">
              <thead className="bg-[#ffffffaa] rounded-lg text-black">
                <tr>
                  <th className="p-2 md:p-4">Rank</th>
                  <th className="p-2 md:p-4">Name</th>
                  <th className="p-2 md:p-4">Price</th>
                  <th className="p-2 md:p-4">Market Cap</th>
                  <th className="p-2 md:p-4">Supply</th>
                  <th className="p-2 md:p-4">Volume(24hr)</th>
                </tr>
              </thead>

              <tbody>
                {currentData.map((crypto: Crypto) => (
                  <tr key={crypto.rank} className="border-b border-gray-200">
                    <td className="p-2 md:p-4">{crypto.rank}</td>
                    <td className="p-2 md:p-4">{crypto.name}</td>
                    <td className="p-2 md:p-4">
                      ${parseFloat(crypto.priceUsd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-2 md:p-4">${formatNumber(parseFloat(crypto.marketCapUsd))}</td>
                    <td className="p-2 md:p-4">{formatNumber(parseFloat(crypto.supply))}</td>
                    <td className="p-2 md:p-4">${formatNumber(parseFloat(crypto.volumeUsd24Hr))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No results message */}
          {filteredData.length === 0 && (
            <div className="text-gray-500 mt-4 text-center">No results found for "{searchTerm}"</div>
          )}

          {/* Pagination controls */}
          <div className="flex flex-col w-full gap-2 mt-4 md:flex-row md:items-center md:gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="py-2 text-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default PriceTracker
