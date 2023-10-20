import { useEffect } from "react";
import { Button, Container, Offcanvas } from "react-bootstrap";
import { useState } from "react";

export default function Notification() {
  const sortOptions = ["Chapter", "Comment", "Post"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [showNoti, setShowNoti] = useState(false);

  const CustomNotiFication = () => (
    <>
      <i
        onClick={() => setShowNoti(true)}
        className="fa-solid fa-bell"
        style={{ fontSize: "25px" }}
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
        <Offcanvas.Body>
          <Container fluid>
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
            {sortOption === "Comment"}
            {sortOption === "Post"}
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
