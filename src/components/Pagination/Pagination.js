import "./Pagination.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function Pagination({ itemArray, passValuePagination, limitItemInPage }) {
  // Pagination
  const pageInRowLimit = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const calculationPaginationArray = (maxItem, pageLimit) => {
    const maxNumberPagination = Math.ceil(maxItem / pageLimit);
    const paginationArrayTemp = [];
    for (let i = 1; i <= maxNumberPagination; i++) {
      paginationArrayTemp.push(i);
    }
    return paginationArrayTemp;
  };

  const [paginationArray, setPaginationArray] = useState();

  useEffect(() => {
    setPaginationArray([
      ...calculationPaginationArray(itemArray?.length, limitItemInPage),
    ]);
    // setCurrentPage(1);
  }, [itemArray]);
  return (
    <div className="collection-pagination">
      <span
        className={`collection-pagination-item pagination-first-page ${
          currentPage === 1 ? "collection-pagination-item--disabled" : ""
        }`}
        value={1}
        onClick={(e) => {
          passValuePagination(1);
          setCurrentPage(1);
        }}
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </span>
      <span
        className={`collection-pagination-item pagination-prev ${
          currentPage === 1 ? "collection-pagination-item--disabled" : ""
        }`}
        value="prev-page"
        onClick={(e) => {
          passValuePagination(currentPage - 1);
          setCurrentPage((prevPage) => prevPage - 1);
        }}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </span>
      {paginationArray?.length - currentPage < pageInRowLimit
        ? paginationArray?.slice(-pageInRowLimit).map((page, index) => {
            return (
              <span
                className={`collection-pagination-item ${
                  currentPage === page
                    ? "collection-pagination-item--active"
                    : ""
                }`}
                key={index}
                data-value={page}
                onClick={(e) => {
                  passValuePagination(parseInt(e.target.dataset.value));
                  setCurrentPage(parseInt(e.target.dataset.value));
                }}
              >
                {page}
              </span>
            );
          })
        : paginationArray
            ?.slice(currentPage - 1, currentPage + pageInRowLimit - 1)
            .map((page, index) => {
              return (
                <span
                  className={`collection-pagination-item ${
                    currentPage === page
                      ? "collection-pagination-item--active"
                      : ""
                  }`}
                  key={index}
                  data-value={page}
                  onClick={(e) => {
                    passValuePagination(parseInt(e.target.dataset.value));
                    setCurrentPage(parseInt(e.target.dataset.value));
                  }}
                >
                  {page}
                </span>
              );
            })}
      <span
        className={`collection-pagination-item pagination-after ${
          currentPage === paginationArray?.at(-1)
            ? "collection-pagination-item--disabled"
            : ""
        }`}
        value="after-page"
        onClick={(e) => {
          passValuePagination(currentPage + 1);
          setCurrentPage((prevPage) => prevPage + 1);
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </span>
      <span
        className={`collection-pagination-item pagination-last-page ${
          currentPage === paginationArray?.at(-1)
            ? "collection-pagination-item--disabled"
            : ""
        }`}
        value={paginationArray?.length}
        onClick={() => {
          passValuePagination(paginationArray?.length);
          setCurrentPage(paginationArray?.length);
        }}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </span>
    </div>
  );
}

export default Pagination;
