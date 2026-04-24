import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-outline pagination-btn"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="pagination-info">
        <span>Page {currentPage} of {totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-outline pagination-btn"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
