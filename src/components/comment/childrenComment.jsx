import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, Button, Card } from "react-bootstrap";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

function Children() {
  return (
    <div className="comment-reply ">
      <div className="commented-section mt-2" style={{ paddingLeft: "58px" }}>
        <div className="d-flex flex-row align-items-center commented-user">
          <img
            className="avatar"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            width="38"
          />
          <h5 className="mr-2">&nbsp;Con&nbsp;</h5>
          <span className="dot mb-1"></span>
          <span className="mb-1 ml-2">&nbsp;3 hours ago</span>
        </div>
        <div className="comment-text-sm" style={{ paddingLeft: "38px" }}>
          <span>
            Truyen hay qua troi Truyen hay qua troi Truyen hay qua troiTruyen
            hay qua troiTruyen hay qua troiTruyen hay qua troiTruyen hay qua
            troiTruyen hay qua troiTruyen hay qua troiTruyen hay qua troiTruyen
            hay qua troi
          </span>
        </div>
        <div className="reply-section" style={{ paddingLeft: "58px" }}>
          <div className="d-flex flex-row align-items-center voting-icon">
            <Col>
              10 &nbsp;
              <button style={{ borderWidth: "0", backgroundColor: "white" }}>
                <AiOutlineLike />
              </button>
              &nbsp; 20 &nbsp;
              <button style={{ borderWidth: "0", backgroundColor: "white" }}>
                <AiOutlineDislike />
              </button>
              &nbsp;&nbsp;
              <button
                className="rounded bg-white"
                style={{
                  border: "none",
                  fontWeight: "bold",
                  color: "gray",
                }}
              >
                Reply
              </button>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Children;
