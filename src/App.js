import { useContext, useEffect } from "react";
import "./App.css";
import Body from "./layout/body";
import { useState } from "react";
import Header from "./layout/header";
import SideBar from "./layout/sidebar";
import { ToastContainer, toast } from "react-toastify";
import * as signalR from "@microsoft/signalr";
import { UserContext } from "./context/UserContext";
import { Link } from "react-router-dom";

export default function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1080) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          marginLeft: window.innerWidth > 1080 && showSidebar ? "230px" : "0",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <Body />
      </div>
      <Header showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <SideBar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
    </>
  );
}
