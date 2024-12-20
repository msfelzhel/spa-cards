import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Количество отображаемых страниц
    
    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);
    
    // Корректируем start, если end достиг максимума
    start = Math.max(1, Math.min(start, totalPages - showPages + 1));

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        className="pagination-button"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      
      <button 
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {getPageNumbers().map(pageNumber => (
        <button
          key={pageNumber}
          className={`pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button 
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
      
      <button 
        className="pagination-button"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};