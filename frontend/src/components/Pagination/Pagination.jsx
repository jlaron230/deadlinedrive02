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
      pageClassName="border border-gray-300 rounded cursor-pointer hover:bg-gray-200 flex items-center justify-center"
      activeClassName="bg-blue-400 text-black"
      previousClassName="bg-white border border-gray-300 rounded px-3 py-1 cursor-pointer hover:bg-gray-200 flex items-center justify-center"
      nextClassName="bg-white border border-gray-300 rounded px-3 py-1 cursor-pointer hover:bg-gray-200 flex items-center justify-center"
      breakClassName="bg-white border border-gray-300 rounded px-3 py-1 cursor-pointer hover:bg-gray-200 flex items-center justify-center"
      pageLinkClassName="px-3"
      disabledClassName="bg-gray-200 cursor-not-allowed"
    />
  );
}

export default Pagination;
