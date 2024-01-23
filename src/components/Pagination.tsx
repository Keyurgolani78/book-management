import "styles/pagination.css";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage?: number;
  onPageChange: (newPage: number) => void;
}

function Pagination({
  totalItems,
  currentPage,
  itemsPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPaginationItems = () => {
    const pageItems = [];
    const maxPagesToShow = 5;

    let startPage, endPage;
    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      pageItems.push(
        <li
          key={number}
          className={`page-item ${currentPage === number ? "active" : ""}`}
        >
          <button
            type="button"
            tabIndex={0}
            aria-label={`Go to page ${number}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        </li>
      );
    }

    return pageItems;
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          type="button"
          tabIndex={0}
          aria-label="Previous"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
      </li>
      {renderPaginationItems()}
      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button
          type="button"
          tabIndex={0}
          aria-label="Next"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </li>
    </ul>
  );
}

export default Pagination;