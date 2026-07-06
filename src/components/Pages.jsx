import React from 'react';

const Pages = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i >= currentPage - 2 && i <= currentPage + 2) {
      pages.push(i);
    }
  }

  return (
    <div className="flex justify-center mt-4 flex-wrap gap-1">
      <button
        className="btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        « First
      </button>

      {/* Prev Btn */}
      <button
        className="btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`btn ${page === currentPage ? 'btn-primary' : ''}`}
        >
          {page}
        </button>
      ))}

      {/* Next Btn */}
      <button
        className="btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>

      <button
        className="btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        Last »
      </button>
    </div>
  );
};

export default Pages;
