import "./Pagination.css";

export default function Pagination({ currentPage, goToNextPage, goToPrevPage, totalPages }) {
  return (
    <>
    <div className="pagination">
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
        Prev
      </button>
      <span> Page {currentPage} of {totalPages} </span>
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
    </>
  );
}

