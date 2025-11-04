import { useState, useEffect } from "react";

interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  currentProjects: T[];
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  getPageNumbers: () => (number | string)[];
}

export default function usePagination<T>(
  projects: T[],
  projectsPerPage: number = 8
): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  // Set starting page to the first page
  useEffect(() => {
    setCurrentPage(1);
  }, [projects]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }

      if (endPage < totalPages) {
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return {
    currentPage,
    totalPages,
    currentProjects,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers,
  };
}
