import { useEffect } from "react";
import "./App.css";
import Body from "./layout/body";
import { useState } from "react";
import Header from "./layout/header";
import SideBar from "./layout/sidebar";
import { ToastContainer } from "react-toastify";

export default function App() {
  const [showSidebar, setShowSidebar] = useState(true);

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
