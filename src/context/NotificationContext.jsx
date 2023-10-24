import React, { useContext, useEffect, useState } from "react";
import * as notificationApi from "../service/api.notification";
import { UserContext } from "./UserContext";
import * as signalR from "@microsoft/signalr";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const NotificationContext = React.createContext(null);

function NotificationProvider({ children }) {
  const [notificationCounts, setNotificationCounts] = useState({
    request: 0,
    chapter: 0,
    follower: 0,
    group: 0,
  });
  const { user } = useContext(UserContext);

  const fetchNotificationsCount = async () => {
    try {
      const response = await notificationApi.getNotificationsCount();
      setNotificationCounts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotificationsCount();
  }, []);

  useEffect(() => {
    if (user === null) {
      return;
    }

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_API_URL + "/notify")
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        newConnection.invoke("RegisterConnection", user.id);
        console.log("SignalR connection established");
      })
      .catch((e) => console.error("SignalR connection failed:", e));

    newConnection.on("ReceiveNotification", (notification) => {
      console.log("notification", notification);
      if (notificationCounts) {
        let updatedCounts = { ...notificationCounts };

        switch (notification.type) {
          case "RequestNotification":
            updatedCounts.request++;
            break;
          case "ChapterNotification":
            updatedCounts.chapter++;
            break;
          case "GroupNotification":
            updatedCounts.group++;
            break;
          case "FollowerNotification":
            updatedCounts.follower++;
            break;
          default:
            break;
        }

        setNotificationCounts(updatedCounts);
      }
      toast.info(() => {
        let link;
        switch (notification.type) {
          case "RequestNotification":
            link = `/requests/${notification.requestType}`;
            break;
          case "ChapterNotification":
            link = `/chapters/${notification.chapter.id}`;
            break;
          case "GroupNotification":
            link = `/groups/${notification.group.id}/Community`;
            break;
          case "FollowerNotification":
            link = `/profile/${notification.user.id}/Community`;
            break;
          default:
            break;
        }
        return (
          <Link to={link} className="card-link">
            You have a {notification.type}
          </Link>
        );
      });
    });

    return () => {
      newConnection.off("ReceiveNotification");
    };
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{
        notificationCounts,
        setNotificationCounts,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationContext, NotificationProvider };
