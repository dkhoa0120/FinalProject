import { Badge, Button, Offcanvas } from "react-bootstrap";
import { useState, useContext, useEffect, useRef } from "react";
import Notification from "./notification";
import * as notificationApi from "../../../service/api.notification";
import { NotificationContext } from "../../../context/NotificationContext";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

export default function NotificationSection() {
  const sortOptions = ["Chapter", "Request", "Follower", "Group"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [showNoti, setShowNoti] = useState(false);
  const { notificationCounts } = useContext(NotificationContext);
  const [loadingNoti, setLoadingNoti] = useState(false);
  const [outOfNoti, setOutOfNoti] = useState(false);
  const notiHeader = useRef(null);
  const [notifications, setNotifications] = useState([]);

  const CustomNotiFication = () => (
    <>
      <i
        onClick={() => setShowNoti(true)}
        className="fa-solid fa-bell notification-icon"
      ></i>
      {Object.values(notificationCounts).reduce((a, b) => a + b) > 0 && (
        <Badge className="notification-number" bg="danger">
          {Object.values(notificationCounts).reduce((a, b) => a + b)}
        </Badge>
      )}
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
    return () => setOutOfNoti(false);
  }, [sortOption, showNoti]);

  const handleSeeMoreNoti = async (type, createdAtCursor) => {
    try {
      const newNotifications = await notificationApi.getNotifications({
        type: type,
        createdAtCursor: createdAtCursor,
      });
      setNotifications([...notifications, ...newNotifications.data]);

      // Set outOfComment to disable loading more comment in scroll event below
      if (newNotifications.data.length > 0) {
        setOutOfNoti(false);
      } else {
        setOutOfNoti(true);
      }
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  useEffect(() => {
    if (!notiHeader.current) return;

    const notificationDiv = notiHeader.current.parentNode;
    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = notificationDiv;

      // Check if you've scrolled to the bottom
      if (
        scrollHeight - scrollTop - clientHeight <= 5 &&
        notifications.length > 0 &&
        !outOfNoti
      ) {
        setLoadingNoti(true);
        setTimeout(() => {
          handleSeeMoreNoti(
            sortOption,
            notifications[notifications.length - 1]?.createdAt
          );
          setLoadingNoti(false);
        }, 1000);
      }
    };
    notificationDiv.addEventListener("scroll", handleScroll);

    return () => {
      notificationDiv.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption, notifications, showNoti, outOfNoti]);

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
          <div ref={notiHeader}>
            <div className="notification-button">
              {sortOptions.map((option, index) => (
                <Button
                  key={index}
                  variant={sortOption === option ? "dark" : "light"}
                  onClick={() => setSortOption(option)}
                  style={{ marginBottom: "10px" }}
                >
                  {option + " "}
                  {notificationCounts[option.toLowerCase()] > 0 && (
                    <Badge pill bg="danger">
                      {notificationCounts[option.toLowerCase()]}{" "}
                    </Badge>
                  )}
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
          </div>
        </Offcanvas.Body>
        {loadingNoti && <SpinnerLoading />}
      </Offcanvas>
    </>
  );
}
