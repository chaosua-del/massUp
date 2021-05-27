import React from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationComponent({
  roomsPerPage,
  totalRooms,
  active,
  handlePaginationChange,
}) {
  const pages = [];

  for (
    let number = 1;
    number <= Math.ceil(totalRooms / roomsPerPage);
    number++
  ) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={handlePaginationChange}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="mt-5 d-flex justify-content-center ">
      <Pagination>{pages}</Pagination>
    </div>
  );
}
