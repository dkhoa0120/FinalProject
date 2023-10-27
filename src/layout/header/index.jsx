import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Navbar,
  Nav,
  Offcanvas,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../../components/search";
import { UserContext } from "../../context/UserContext";
import "./styles.css";
import NotificationSection from "./components/notificationSection";

export default function Header({ showSidebar, toggleSidebar }) {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const { logout, user } = useContext(UserContext);

  const [show, setShow] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const CustomNavbarToggle = () => (
    <img
      className="avatar"
      src={user?.avatarPath || "/img/avatar/default.png"}
      alt="Toggle Navigation"
      onClick={() => setShow(true)}
    />
  );

  return (
    <>
      <Navbar key={false} expand={false} className={scrolled ? "scrolled" : ""}>
        <Container fluid>
          <div style={{ userSelect: "none" }}>
            <i
              className="fa-solid fa-bars"
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={toggleSidebar}
            ></i>
            &nbsp; &nbsp;
            <Navbar.Brand
              style={{
                opacity: showSidebar ? "0" : "1",
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              <img
                style={{ width: "40px", height: "100%" }}
                src={process.env.PUBLIC_URL + "/favicon.ico"}
                alt="3KManga logo"
              />
              <span style={{ fontWeight: "800" }}>3K Manga </span>
            </Navbar.Brand>
          </div>
          <div className="d-flex align-items-center">
            {user && (
              <>
                <NotificationSection />
              </>
            )}
            &nbsp; &nbsp;
            <SearchBar placeholder="Enter a Manga Name..." />
            &nbsp; &nbsp;
            <Navbar.Toggle as={CustomNavbarToggle} />
            <Navbar.Offcanvas
              show={show}
              onHide={() => setShow(false)}
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="end"
            >
              <Offcanvas.Header
                style={{ textAlign: "center", display: "block" }}
                closeButton
              >
                <img
                  className="avatar"
                  src={user?.avatarPath || "/img/avatar/default.png"}
                  alt="Avatar"
                />
                <Offcanvas.Title style={{ fontWeight: "bold" }}>
                  {user ? (
                    <div className="d-flex flex-column justify-content-center">
                      {user.name}
                      <Link to={`/profile/${user.id}/Uploads`} className="mt-2">
                        <Button
                          variant="outline-dark"
                          onClick={() => {
                            setShow(false);
                          }}
                        >
                          <i className="fa-solid fa-user"></i> Profile
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    "GUEST"
                  )}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav>
                  {user ? (
                    <>
                      <NavLink to={`/edit-profile`}>
                        <Button
                          className="mb-3 w-100"
                          variant="outline-dark"
                          onClick={() => setShow(false)}
                        >
                          <i className="fa-solid fa-gear"></i> Settings
                        </Button>
                      </NavLink>
                      {user.roles.includes("Uploader") && (
                        <NavLink to="/upload/chapters">
                          <Button
                            className="mb-3 w-100"
                            variant="outline-dark"
                            onClick={() => {
                              setShow(false);
                            }}
                          >
                            <i className="fa-solid fa-list-check"></i> Upload
                            Chapter
                          </Button>
                        </NavLink>
                      )}
                    </>
                  ) : null}

                  {user ? (
                    <>
                      {(user.roles.includes("Admin") ||
                        user.roles.includes("Manager")) && (
                        <>
                          <Dropdown>
                            <Dropdown.Toggle
                              className="mb-3 w-100"
                              variant="outline-dark"
                            >
                              <i className="fa-solid fa-list-check"></i> Manage
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="mb-3 w-100">
                              <Row className="px-2">
                                <Col>
                                  <NavLink to="/manage/requests/PromotionRequest">
                                    <Button
                                      className="w-100"
                                      variant="outline-dark"
                                      onClick={() => {
                                        setShow(false);
                                      }}
                                    >
                                      <i className="fa-solid fa-envelope"></i>{" "}
                                      Requests
                                    </Button>
                                  </NavLink>
                                </Col>
                                <Col>
                                  <NavLink to="/manage/mangas">
                                    <Button
                                      className="w-100"
                                      variant="outline-dark"
                                      onClick={() => {
                                        setShow(false);
                                      }}
                                    >
                                      <i className="fa-solid fa-book"></i>{" "}
                                      Mangas
                                    </Button>
                                  </NavLink>
                                </Col>
                              </Row>
                              <Row className="px-2 my-2">
                                <Col>
                                  <NavLink to="/manage/categories">
                                    <Button
                                      className="w-100"
                                      variant="outline-dark"
                                      onClick={() => {
                                        setShow(false);
                                      }}
                                    >
                                      <i className="fa-solid fa-layer-group"></i>{" "}
                                      Genres
                                    </Button>
                                  </NavLink>
                                </Col>
                                <Col>
                                  <NavLink to="/manage/authors">
                                    <Button
                                      className="w-100"
                                      variant="outline-dark"
                                      onClick={() => {
                                        setShow(false);
                                      }}
                                    >
                                      <i className="fa-solid fa-compass-drafting"></i>{" "}
                                      Authors
                                    </Button>
                                  </NavLink>
                                </Col>
                              </Row>
                            </Dropdown.Menu>
                          </Dropdown>
                        </>
                      )}
                    </>
                  ) : null}

                  {user ? (
                    <>
                      {user.roles.includes("Admin") && (
                        <NavLink to="/manage/users/UserRole">
                          <Button
                            className="mb-3 w-100"
                            variant="outline-dark"
                            onClick={() => {
                              setShow(false);
                            }}
                          >
                            <i className="fa-solid fa-user"></i> Manage User
                          </Button>
                        </NavLink>
                      )}
                      <Button
                        className="mb-3 w-100"
                        variant="dark"
                        onClick={() => {
                          handleLogout();
                          setShow(false);
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <NavLink to="/login">
                        <Button
                          onClick={() => setShow(false)}
                          className="mb-3 w-100"
                          variant="dark"
                        >
                          Login
                        </Button>
                      </NavLink>
                      <NavLink to="/register">
                        <Button
                          onClick={() => setShow(false)}
                          className="mb-3 w-100"
                          variant="light"
                        >
                          Register
                        </Button>
                      </NavLink>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
