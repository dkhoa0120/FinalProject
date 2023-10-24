import { Badge, Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import Notification from "./notification";
import { useContext } from "react";
import * as notificationApi from "../../../service/api.notification";
import { NotificationContext } from "../../../context/NotificationContext";
import { useEffect } from "react";

export default function NotificationSection() {
  const sortOptions = ["Chapter", "Request", "Follower", "Group"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [showNoti, setShowNoti] = useState(false);
  const { notificationCounts } = useContext(NotificationContext);

  const [notifications, setNotifications] = useState([]);

  const CustomNotiFication = () => (
    <>
      <i
        onClick={() => setShowNoti(true)}
        className="fa-solid fa-bell"
        style={{ fontSize: "25px", cursor: "pointer" }}
      ></i>
      <Badge className="notification-number" bg="danger">
        {Object.values(notificationCounts).reduce((a, b) => a + b)}
      </Badge>
    </>
  );

  const fetchNotifications = async (filter) => {
    try {
      const response = await notificationApi.getNotifications(filter);
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications({ type: sortOption });
  }, [sortOption, showNoti]);

  return (
    <>
      <Button as={CustomNotiFication} />
      <Offcanvas
        show={showNoti}
        onHide={() => setShowNoti(false)}
        placement="end"
        id={`offcanvasNavbar-expand-false`}
        aria-labelledby={`offcanvasNavbarLabel-expand-false`}
        style={{ width: "470px", maxHeight: "80vh" }}
      >
        <Offcanvas.Header closeButton style={{ paddingBottom: "0px" }}>
          <h3 style={{ fontWeight: "bold" }}>Notifications</h3>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="notification-button">
            {sortOptions.map((option, index) => (
              <Button
                key={index}
                variant={sortOption === option ? "dark" : "light"}
                onClick={() => setSortOption(option)}
                style={{ marginBottom: "10px" }}
              >
                {option + " "}
                <Badge pill bg="danger">
                  {notificationCounts[option.toLowerCase()]}{" "}
                </Badge>
              </Button>
            ))}
          </div>
          {sortOption === "Chapter" && (
            <Notification
              notifications={notifications}
              type={"Chapter"}
              close={() => setShowNoti(false)}
            />
          )}
          {sortOption === "Request" && (
            <Notification
              notifications={notifications}
              type={"Request"}
              close={() => setShowNoti(false)}
            />
          )}
          {sortOption === "Follower" && (
            <Notification
              notifications={notifications}
              type={"Follower"}
              close={() => setShowNoti(false)}
            />
          )}
          {sortOption === "Group" && (
            <Notification
              notifications={notifications}
              type={"Group"}
              close={() => setShowNoti(false)}
            />
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
