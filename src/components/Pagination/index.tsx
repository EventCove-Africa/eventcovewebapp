import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import React, { useState } from "react";

interface PaginationProps {
  totalPages?: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages = 1,
  onPageChange,
  maxVisiblePages = 3,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      if (startPage > 2) {
        pages.unshift("...");
      }
      pages.unshift(1);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-dark_200 disabled:opacity-50"
      >
        <ArrowLeft2 size="16" color="#868B90" variant="Bold" />
      </button>
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-4 py-2 text-grey_100">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageChange(page as number)}
            className={`px-3 py-2 text-xs ${
              currentPage === page
                ? "text-primary_100 border border-primary_100"
                : "text-grey_100 border border-grey_800"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-dark_200 disabled:opacity-50"
      >
        <ArrowRight2 size="16" color="#868B90" variant="Bold" />
      </button>
    </div>
  );
};

export default Pagination;
