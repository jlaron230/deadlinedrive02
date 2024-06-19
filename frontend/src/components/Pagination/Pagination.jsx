const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  if (totalPages <= 7) {
    // If there are 7 or fewer total pages, show them all
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // More than 7 total pages
    if (currentPage <= 4) {
      // If current page is <= 4, show first 5 pages + "..." + last 2 pages
      pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 3) {
      // If current page is near the end, show first 2 pages + "..." + last 5 pages
      pageNumbers.push(1, 2, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // Else show first 2 pages + "..." + 3 middle pages + "..." + last 2 pages
      pageNumbers.push(1, 2, "...");
      pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      pageNumbers.push("...", totalPages - 1, totalPages);
    }
  }

  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex select-none space-x-1 text-gray-700">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        {pageNumbers.map((number, index) =>
          number === "..." ? (
            <span key={index} className="rounded-md px-4 py-2">
              {number}
            </span>
          ) : (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`rounded-md px-4 py-2 transition duration-300 hover:bg-gray-400 ${
                currentPage === number ? "bg-gray-400" : "bg-gray-200"
              }`}
            >
              {number}
            </button>
          )
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-md bg-gray-200 px-4 py-2 transition duration-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
