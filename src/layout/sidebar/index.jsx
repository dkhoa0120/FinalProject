import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Image, Nav, Navbar } from "react-bootstrap";
import React, { useState } from "react";
import * as mangaApi from "../../service/api.manga";

function SideBar(props) {
  const navigate = useNavigate();
  const [dropdownStates, setDropdownStates] = useState({
    browsing: true,
    follows: true,
    aboutUs: true,
  });

  const navigateRandomManga = async () => {
    const res = await mangaApi.getRandomManga();
    navigate(`mangas/${res.data}`);
  };

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
        {
          text: "Latest Manga",
          to: "/mangas?sortOption=LatestManga",
          key: "latest-mangas",
        },
        {
          text: "Latest Chapter",
          to: "/mangas?sortOption=LatestChapter",
          key: "latest-chapters",
        },
        {
          text: "Random",
          to: "/mangas/random",
          key: "random",
          onClick: navigateRandomManga,
        },
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
          <i className="fa-solid fa-bookmark"></i> &nbsp; Personal
        </MenuItem>
      ),
      items: [
        {
          text: "Followed Mangas",
          to: "/followed-mangas",
          key: "followed-mangas",
        },
        {
          text: "Followed Users",
          to: "/followed-users",
          key: "followed-users",
        },
        {
          text: "Community Feeds",
          to: "/community",
          key: "community-feeds",
        },
        { text: "Requests", to: "/requests/JoinGroupRequest", key: "requests" },
      ],
    },
    {
      section: "aboutUs",
      heading: (
        <MenuItem
          className="sidebar-heading"
          onClick={() => handleDropdownClick("aboutUs")}
          key="about"
        >
          <i className="fa-solid fa-globe"></i> &nbsp; 3KManga
        </MenuItem>
      ),
      items: [
        {
          text: "Site Rules",
          to: "/about",
          key: "site-rules",
        },
      ],
    },
  ];

  return (
    <Nav className={`nav-menu ${props.showSidebar ? "show" : "hide"}`}>
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
            onClick={window.innerWidth <= 767 ? props.toggleSidebar : ""}
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
                  onClick={() => {
                    if (window.innerWidth <= 767) props.toggleSidebar();
                    if (item.onClick) item.onClick();
                  }}
                  key={item.key}
                  className={`nav-text drop-item${
                    dropdownStates[menuItem.section] ? " active" : ""
                  }`}
                  component={<Link to={item.to} />}
                >
                  {item.text}{" "}
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
