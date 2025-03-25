export default function BlogPagination({ totalPages, currentPage, setCurrentPage }){
  const safeCurrentPage = Number(currentPage) || 1;

    if (totalPages <= 1) return null// Hide pagination if there's only one page

  const handlePageChange = (page) => {
    console.log(page)
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [1]; // Always include first page

    if (safeCurrentPage > 3) {
      pages.push("...");
    }

    for (let i = Math.max(2, safeCurrentPage - 1); i <= Math.min(totalPages - 1, safeCurrentPage + 1); i++) {
      pages.push(i);
    }

    if (safeCurrentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages); // Always include last page
    }

    return pages;
  };
    return(
        <>
        <div className="h-full w-full my-4">
            <div className="h-auto w-[90%] mx-auto flex justify-center gap-4">
            <button className="text-white text-lg font-medium py-2 px-4 bg-dark1 rounded-xl " disabled={safeCurrentPage === 1} onClick={() => handlePageChange(safeCurrentPage - 1)}>
          Previous
        </button>
  
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index}>...</span>
          ) : (
            <button className="text-white text-lg font-medium py-2 px-4 bg-dark1 rounded-xl "
              key={index}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}

        <button className="text-white text-lg font-medium py-2 px-4 bg-dark1 rounded-xl " disabled={safeCurrentPage === totalPages} onClick={() =>handlePageChange(safeCurrentPage + 1)}>
          Next
        </button>
            </div>
        </div>
        </>
    )
}
