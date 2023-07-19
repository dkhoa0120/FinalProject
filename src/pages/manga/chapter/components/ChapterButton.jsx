import React from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ChapterButton() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "10px" }}
      >
        <button className="button-50" onClick={() => navigate(-1)}>
          <i class="fa-solid fa-list-ul"></i>
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button className="button-50">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            <span className="dropdown-text">Chapter 2</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Chapter 1</Dropdown.Item>
            <Dropdown.Item>Chapter 2</Dropdown.Item>
            <Dropdown.Item>Chapter 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button className="button-50">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className="button-50">
          <i class="fa-regular fa-heart"></i>
        </button>
        <button className="button-50">
          <i class="fa-regular fa-flag"></i>
        </button>
      </div>
    </>
  );
}
