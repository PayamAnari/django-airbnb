import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-12">
      <div className="flex items-center ml-0 lg:ml-12 space-x-6">
        <button 
          className={`px-4 py-2 bg-airbnb hover:bg-airbnb-dark text-white rounded ${page <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={page <= 1} 
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        
        <span>Page {page} of {totalPages}</span>
      
        <button 
          className={`px-4 py-2 bg-airbnb hover:bg-airbnb-dark text-white rounded ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={page >= totalPages} 
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
