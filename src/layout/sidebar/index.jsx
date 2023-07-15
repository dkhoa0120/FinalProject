import { Link } from "react-router-dom";
import "./styles.css";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Image, Nav, Navbar } from "react-bootstrap";
import React, { useState } from "react";

function SideBar(props) {
  const [dropdownStates, setDropdownStates] = useState({
    browsing: true,
    follows: true,
  });

  const handleDropdownClick = (section) => {
    setDropdownStates({
      ...dropdownStates,
      [section]: !dropdownStates[section],
    });
  };

  const menuItems = [
    {
      section: "browsing",
      heading: (
        <MenuItem
          className="sidebar-heading"
          onClick={() => handleDropdownClick("browsing")}
          key="browsing-heading"
        >
          <i className="fa-solid fa-book-open"></i> &nbsp; Browsing
        </MenuItem>
      ),
      items: [
        { text: "Popular", to: "/Manga/popular", key: "popular" },
        {
          text: "Latest Manga",
          to: "/Manga?sortOption=LatestManga",
          key: "latest-manga",
        },
        {
          text: "Latest Chapter",
          to: "/Manga?sortOption=LatestChapter",
          key: "latest-chapter",
        },
        { text: "Random", to: "/Manga/random", key: "random" },
      ],
    },
    {
      section: "follows",
      heading: (
        <MenuItem
          className="sidebar-heading"
          onClick={() => handleDropdownClick("follows")}
          key="follows-heading"
        >
          <i className="fa-solid fa-bookmark"></i> &nbsp; Follows
        </MenuItem>
      ),
      items: [
        {
          text: "Followed Manga",
          to: "/followed-manga",
          key: "followed-manga",
        },
        { text: "Followed User", to: "/followed-user", key: "followed-user" },
        { text: "Community Feeds", to: "/community", key: "community-feeds" },
      ],
    },
  ];

  return (
    <Nav className="nav-menu">
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#fff",
          },
        }}
      >
        <Menu>
          <h5 className="sidebar-title">
            <i
              className="fa-solid fa-bars"
              style={{ cursor: "pointer" }}
              onClick={props.toggleSidebar}
            ></i>
            &nbsp; &nbsp;
            <Navbar.Brand>
              <Image
                style={{ width: "40px", height: "100%" }}
                src={process.env.PUBLIC_URL + "/favicon.ico"}
              />
              3K Manga
            </Navbar.Brand>
          </h5>
          <MenuItem
            className="sidebar-heading"
            component={<Link to="/" />}
            key="home"
          >
            <i className="fa-solid fa-house"></i> &nbsp; Home
          </MenuItem>
          <hr className="sidebar-divider" />
          {menuItems.map((menuItem) => (
            <React.Fragment key={menuItem.section}>
              {menuItem.heading}
              {menuItem.items.map((item, key) => (
                <MenuItem
                  key={item.key}
                  className={`nav-text drop-item${
                    dropdownStates[menuItem.section] ? " active" : ""
                  }`}
                  component={<Link to={item.to} />}
                >
                  {item.text}
                </MenuItem>
              ))}
              <hr className="sidebar-divider" />
            </React.Fragment>
          ))}
        </Menu>
      </Sidebar>
    </Nav>
  );
}

export default SideBar;
