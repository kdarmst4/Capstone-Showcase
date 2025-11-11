import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  getPageNumbers: () => (number | string)[];
  totalProjects: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  getPageNumbers,
  totalProjects,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`page-number ${page === currentPage ? "active" : ""}`}
          onClick={() => typeof page === "number" && goToPage(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-button"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      <div className="page-info">
        Page {currentPage} of {totalPages} ({totalProjects} total projects)
      </div>
    </div>
  );
};

export default Pagination;
