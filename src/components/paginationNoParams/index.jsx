import React from "react";
import { Button } from "react-bootstrap";

export default function PaginationNoParams({ totalPages, page, onPageChange }) {
  const updatePageParam = (pageNum) => {
    onPageChange(pageNum);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const addPageNumber = (i) => {
      pageNumbers.push(
        <Button
          key={i}
          variant={`btn ${page === i ? "btn-dark" : "btn-light"}`}
          onClick={() => updatePageParam(i)}
        >
          {i}
        </Button>
      );
    };

    const dot = (key) => {
      pageNumbers.push(
        <Button key={key} variant="btn btn-light" disabled>
          ...
        </Button>
      );
    };

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        addPageNumber(i);
      }
    } else {
      if (page <= 2) {
        for (let i = 1; i <= 4; i++) {
          addPageNumber(i);
        }
        dot("dot1");
      } else if (page >= totalPages - 1) {
        dot("dot2");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          addPageNumber(i);
        }
      } else {
        dot("dot1");
        for (let i = page - 1; i <= page + 1; i++) {
          addPageNumber(i);
        }
        dot("dot2");
      }
    }

    return pageNumbers;
  };

  if (totalPages > 1) {
    return (
      <div className="content-center">
        <Button
          key="<<"
          onClick={() => updatePageParam(1)}
          variant="btn btn-dark"
        >
          <i className="fa-solid fa-angles-left"></i>
        </Button>
        &nbsp;
        {page > 1 ? (
          <Button
            key="<"
            onClick={() => updatePageParam(page - 1)}
            variant="btn btn-dark"
          >
            <i className="fa-solid fa-angle-left"></i>
          </Button>
        ) : (
          <Button variant="btn btn-dark" disabled>
            <i className="fa-solid fa-angle-left"></i>
          </Button>
        )}
        &nbsp;
        {renderPageNumbers()}
        &nbsp;
        {page < totalPages ? (
          <Button
            key=">"
            variant="btn btn-dark"
            onClick={() => updatePageParam(page + 1)}
          >
            <i className="fa-solid fa-angle-right"></i>
          </Button>
        ) : (
          <Button variant="btn btn-dark" disabled>
            <i className="fa-solid fa-angle-right"></i>
          </Button>
        )}
        &nbsp;
        <Button
          key=">>"
          onClick={() => updatePageParam(totalPages)}
          className="btn btn-dark"
        >
          <i className="fa-solid fa-angles-right"></i>
        </Button>
      </div>
    );
  }
}
