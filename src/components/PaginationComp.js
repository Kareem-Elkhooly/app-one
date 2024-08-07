// Style File --------------------------------------------------
import "./css/pagination.css";
// From React and Redux ----------------------------------------
import React from "react";
// React Paginate
import ReactPaginate from "react-paginate";
// ##############################################################
export default function PaginationComp(props) {
  const pageCount = props.numOfPages;
  const handlePageClick = (data) => {
    props.productsShow(data.selected + 1);
    const element = document.getElementById("scrollToHere");
    element.scrollIntoView();
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        // styles
        containerClassName="pagination justify-content-center p-3 mb-3 btn-group"
        pageClassName="page-item btn-group"
        pageLinkClassName="page-link btn btn-primary"
        activeClassName="active"
        previousClassName="page-item btn-group"
        nextClassName="page-item btn-group"
        breakClassName="break-me"
        nextLinkClassName="page-link btn btn-primary"
        previousLinkClassName="page-link btn btn-primary"
        breakLinkClassName="page-link btn btn-primary"
      />
    </>
  );
}
