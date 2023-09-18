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

export default function Header(props) {
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
    <Navbar key={false} expand={false} className={scrolled ? "scrolled" : ""}>
      <Container fluid>
        <div>
          <i
            className="fa-solid fa-bars"
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={props.toggleSidebar}
          ></i>
          &nbsp; &nbsp;
          <Navbar.Brand>
            <img
              style={{ width: "40px", height: "100%" }}
              src={process.env.PUBLIC_URL + "/favicon.ico"}
              alt="3KManga logo"
            />
            <span style={{ fontWeight: "800" }}>3K Manga </span>
          </Navbar.Brand>
        </div>

        <div>
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
              <div>
                <img
                  className="avatar"
                  src={user?.avatarPath || "/img/avatar/default.png"}
                  alt="Avatar"
                />
              </div>
              <Offcanvas.Title style={{ fontWeight: "bold" }}>
                {user ? (
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    {user.name}
                    <Link to={`/Profile/${user.id}`} className="mt-2">
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
                <Row>
                  <Col>
                    <Button className="mb-3 w-100" variant="outline-dark">
                      <i className="fa-solid fa-sun"></i> Theme
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {user ? (
                      <>
                        {user.roles.includes("Uploader") && (
                          <NavLink to="/upload/chapter">
                            <Button
                              className="mb-3 w-100"
                              variant="outline-dark"
                              onClick={() => {
                                setShow(false);
                              }}
                            >
                              <i className="fa-solid fa-list-check"></i> Upload
                              chapter
                            </Button>
                          </NavLink>
                        )}
                      </>
                    ) : null}
                  </Col>
                </Row>
                {user ? (
                  <>
                    {user.roles.includes("Admin") && (
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
                                <NavLink to="/manage/User">
                                  <Button
                                    className="w-100"
                                    variant="outline-dark"
                                    onClick={() => {
                                      setShow(false);
                                    }}
                                  >
                                    <i className="fa-solid fa-user"></i> Users
                                  </Button>
                                </NavLink>
                              </Col>
                              <Col>
                                <NavLink to="/manage/Manga">
                                  <Button
                                    className="w-100"
                                    variant="outline-dark"
                                    onClick={() => {
                                      setShow(false);
                                    }}
                                  >
                                    <i className="fa-solid fa-book"></i> Mangas
                                  </Button>
                                </NavLink>
                              </Col>
                            </Row>
                            <Row className="px-2 my-2">
                              <Col>
                                <NavLink to="/manage/Category">
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
                                <NavLink to="/manage/Author">
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
  );
}
