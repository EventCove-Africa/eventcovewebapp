import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 3,
}) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    onPageChange(page);
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );

    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(
        1,
        endPage - maxVisiblePages + 1
      );
    }

    if (startPage > 1) {
      pages.push(1);

      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
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
    <div className="flex items-center gap-2">
      {/* Previous */}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-dark_200 disabled:opacity-50"
      >
        <ArrowLeft2
          size="16"
          color="#868B90"
          variant="Bold"
        />
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-4 py-2 text-grey_100"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page as number)}
            className={`px-3 py-2 text-xs rounded border ${
              isActive
                ? "text-primary_100 border-primary_100"
                : "text-grey_100 border-grey_800"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-dark_200 disabled:opacity-50"
      >
        <ArrowRight2
          size="16"
          color="#868B90"
          variant="Bold"
        />
      </button>
    </div>
  );
};

export default Pagination;