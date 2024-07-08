import ReactPaginate from 'react-paginate';

function Pagination({ pageCount, onPageChange }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1} // Ajouté pour mobile
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="flex flex-wrap justify-center space-x-2 mt-4"
      pageClassName="bg-white border border-gray-300 rounded px-3 py-1 cursor-pointer hover:bg-gray-200"
      activeClassName="bg-blue-500 text-black"
      previousClassName="bg-white border border-gray-300 rounded px-3 py-1 cursor-pointer hover:bg-gray-200"
      nextClassName="bg-white border border-gray-300 rounded px-3 py-1 cursor-pointer hover:bg-gray-200"
      breakClassName="bg-white border border-gray-300 rounded px-3 py-1 cursor-pointer hover:bg-gray-200"
      disabledClassName="bg-gray-200 cursor-not-allowed"
    />
  );
}

export default Pagination;
