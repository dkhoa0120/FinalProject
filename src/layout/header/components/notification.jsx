import { Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";

export default function Notification() {
  const sortOptions = ["Chapter", "Post", "Request"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [showNoti, setShowNoti] = useState(false);

  const CustomNotiFication = () => (
    <>
      <i
        onClick={() => setShowNoti(true)}
        className="fa-solid fa-bell"
        style={{ fontSize: "25px", cursor: "pointer" }}
      ></i>
      <span className="badge">2</span>
    </>
  );

  return (
    <>
      <Button as={CustomNotiFication} />
      <Offcanvas
        show={showNoti}
        onHide={() => setShowNoti(false)}
        placement="end"
        id={`offcanvasNavbar-expand-false`}
        aria-labelledby={`offcanvasNavbarLabel-expand-false`}
      >
        <Offcanvas.Header closeButton style={{ paddingBottom: "0px" }}>
          <h3 style={{ fontWeight: "bold" }}>Notifications</h3>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {sortOptions.map((option, index) => (
            <Button
              key={index}
              variant={sortOption === option ? "dark" : "light"}
              onClick={() => setSortOption(option)}
            >
              {option}
            </Button>
          ))}
          {sortOption === "Chapter"}
          {sortOption === "Post"}
          {sortOption === "Request"}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
