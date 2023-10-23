import { Badge, Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Notification from "./notification";

export default function NotificationSection() {
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
      <Badge className="notification-number" bg="danger">
        2
      </Badge>
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
        style={{ width: "400px" }}
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
              style={{ marginBottom: "10px" }}
            >
              {option}{" "}
              <Badge pill bg="danger">
                1
              </Badge>
            </Button>
          ))}
          {sortOption === "Chapter" && <Notification />}
          {sortOption === "Post" && <Notification />}
          {sortOption === "Request" && <Notification />}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
