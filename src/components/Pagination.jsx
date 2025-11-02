import React from 'react';

function Pagination({ currentPage, totalPages, hasNext, hasPrevious, onNext, onPrevious, onPageChange }) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        start = 2;
        end = Math.min(4, totalPages - 1);
      }
      
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
        end = totalPages - 1;
      }
      
      if (start > 2) {
        pages.push('ellipsis-start');
      }
      
      const seen = new Set(pages);
      for (let i = start; i <= end; i++) {
        if (!seen.has(i)) {
          pages.push(i);
          seen.add(i);
        }
      }
            if (end < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      
      if (totalPages > 1 && !seen.has(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 px-4">
      <div className="flex items-center gap-2 text-sm text-yellow-500">
        <span>Page {currentPage} of {totalPages}</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`
            w-9 h-9 flex items-center justify-center rounded-md border border-yellow-600 bg-black
            transition-colors hover:bg-yellow-400 hover:text-black text-yellow-400
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-yellow-400
            text-sm font-medium
          `}
          aria-label="Previous page"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-yellow-500 text-sm"
              >
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                min-w-9 h-9 px-3 flex items-center justify-center rounded-md border
                transition-colors text-sm font-medium
                ${
                  isActive
                    ? 'bg-yellow-400 text-black border-yellow-400'
                    : 'bg-black border-yellow-600 text-yellow-400 hover:bg-yellow-400 hover:text-black'
                }
              `}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`
            w-9 h-9 flex items-center justify-center rounded-md border border-yellow-600 bg-black
            transition-colors hover:bg-yellow-400 hover:text-black text-yellow-400
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-yellow-400
            text-sm font-medium
          `}
          aria-label="Next page"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
