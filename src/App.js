import React, { useEffect } from "react";
import "./App.css";
import Body from "./layout/body";
import { useState } from "react";
import Header from "./layout/header";
import SideBar from "./layout/sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const toggleSidebar = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
    setShowSidebar(!showSidebar);
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth <= 768) {
        setShowSidebar(false);
        setIsNavMenuOpen(false);
      } else {
        setShowSidebar(true);
        setIsNavMenuOpen(true);
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

  return (
    <div>
      <div style={{ display: "flex", height: "100%" }}>
        <div
          style={{
            flex: "1",
            marginLeft: windowWidth > 1080 && isNavMenuOpen ? "230px" : "0",
          }}
        >
          <Body showSidebar={showSidebar} isNavMenuOpen={isNavMenuOpen} />
        </div>
        <Header toggleSidebar={toggleSidebar} />
        {showSidebar && <SideBar toggleSidebar={toggleSidebar} />}
      </div>
    </div>
  );
}

export default App;
