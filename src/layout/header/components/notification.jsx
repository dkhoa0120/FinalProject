import { Link } from "react-router-dom";
import { calculateTimeDifference } from "../../../utilities/dateTimeHelper";
import * as notificationApi from "../../../service/api.notification";
import { useContext } from "react";
import { NotificationContext } from "../../../context/NotificationContext";

export default function Notification({ notifications, type, close }) {
  const { notificationCounts, setNotificationCounts } =
    useContext(NotificationContext);

  // add link to each request
  const AddLink = ({ notification, children }) => {
    let link;
    switch (type) {
      case "Request":
        link = `/requests/${notification?.requestType}`;
        break;
      case "Chapter":
        link = `/chapters/${notification?.chapter?.id}`;
        break;
      case "Group":
        link = `/groups/${notification?.group?.id}/Community`;
        break;
      case "Follower":
        link = `/profile/${notification?.followedPerson?.id}/Community`;
        break;
      default:
        break;
    }
    return (
      <Link to={link} className="card-link">
        {children}
      </Link>
    );
  };

  // handle view the request
  const handleView = async (notification) => {
    await notificationApi.putNotificationViewStatus(notification?.id);
    if (type && notificationCounts && !notification?.isViewed) {
      let updatedCounts = { ...notificationCounts };
      const typeKey = type.toLowerCase();
      updatedCounts[typeKey] = Math.max((updatedCounts[typeKey] || 0) - 1, 0);
      setNotificationCounts(updatedCounts);
    }
    close();
  };

  return (
    <>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <AddLink key={notification.id} notification={notification}>
            <div
              className={"notification-container"}
              onClick={() => handleView(notification)}
            >
              <div className="d-flex" style={{ padding: "0 10px" }}>
                <img
                  className="avatar"
                  src={
                    type === "Request"
                      ? "/img/avatar/request.png"
                      : type === "Chapter"
                      ? notification?.chapter?.manga?.coverPath ||
                        "/img/error/coverNotFound.png"
                      : type === "Group"
                      ? notification?.group?.avatarPath ||
                        "/img/avatar/defaultGroup.jpg"
                      : notification?.followedPerson?.avatarPath ||
                        "/img/avatar/default.png"
                  }
                  alt="Avatar"
                  style={{ marginRight: "5px" }}
                />
                <div style={{ flexGrow: "1" }}>
                  <span
                    className={
                      "notification" +
                      (notification?.isViewed ? "" : " not-read")
                    }
                  >
                    {type === "Request"
                      ? `Your ${notification?.requestType} has been processed.`
                      : type === "Chapter"
                      ? `${notification?.chapter?.manga?.originalTitle} has a new chapter number ${notification?.chapter?.number}.`
                      : type === "Group"
                      ? `${notification?.group?.name} has a new post.`
                      : `${notification?.followedPerson?.name} has a new post.`}
                  </span>
                  <span className="comment-time" style={{ display: "block" }}>
                    {calculateTimeDifference(notification?.createdAt)}
                  </span>
                </div>
                {!notification?.isViewed && (
                  <i className="fa-solid fa-circle mark-read-icon notification" />
                )}
              </div>
            </div>
          </AddLink>
        ))
      ) : (
        <span className="content-center">No notification yet</span>
      )}
    </>
  );
}
