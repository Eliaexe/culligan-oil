import { ChevronLeft, ChevronRight } from "lucide-react"

type PaginationProps = {
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
  totalItems: number
}

export function Pagination({ currentPage, setCurrentPage, totalPages, totalItems }: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Affichage {(currentPage - 1) * 10 + 1} - {Math.min(currentPage * 10, totalItems)} sur {totalItems} commandes
      </p>
      <div className="flex space-x-2">
        <button
          className="p-2 border border-gray-500 rounded"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          className="p-2 border border-gray-500 rounded"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
