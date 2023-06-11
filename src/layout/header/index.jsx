/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import { Button, Container, Navbar, Nav, Offcanvas } from "react-bootstrap";
import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../../components/search';
import { getMangas } from '../../service/Data.service';
import { UserContext } from '../../context/UserContext';
import { toast } from "react-toastify";
import "./styles.css";


function Header(props) {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])
    const { logout, user } = useContext(UserContext);

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        await getMangas()
            .then((result) => {
                setData(result.data)
            })
    }

    const handleLogout = () => {
        logout();
        window.location.reload();
        toast.success("Log out success!")
    }



    const CustomNavbarToggle = ({ onClick }) => (
        <img className="avatar"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"  // Replace with the path to your image
            alt="Toggle Navigation"
            style={{
                width: 40,
                height: 40
            }}
            onClick={onClick}
        />
    );

    return (


        <Navbar key={false} expand={false} className={scrolled ? "scrolled" : ""}>
            <Container fluid>
                <div>
                    <Navbar.Brand><i className="fa-solid fa-bars" onClick={props.toggleSidebar}></i></Navbar.Brand>
                    <Navbar.Brand><img style={{ width: "40px", height: "100%" }} src={process.env.PUBLIC_URL + '/favicon.ico'} />
                        <span style={{ fontWeight: "800" }}>3K Manga </span>
                    </Navbar.Brand>
                </div>



                <div>
                    <SearchBar placeholder="Enter a Manga Name..." data={data} />
                    &nbsp;  &nbsp;
                    <Navbar.Toggle as={CustomNavbarToggle} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-false`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                        placement="end"
                    >

                        <Offcanvas.Header style={{ textAlign: "center", display: "block" }} closeButton>
                            &nbsp;
                            <div>
                                <img className="avatar"
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"  // Replace with the path to your image
                                    alt="Toggle Navigation"
                                    style={{
                                        width: 60,
                                        height: 60
                                    }}
                                />

                            </div>
                            &nbsp;
                            {user && user.auth === true ?
                                <Offcanvas.Title>
                                    {user && user.email && <span> {user.email}</span>}
                                </Offcanvas.Title>
                                :
                                <Offcanvas.Title>
                                    GUEST
                                </Offcanvas.Title>
                            }


                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav>
                                {user && user.auth === true ? (
                                    <>
                                        <Button className="mb-4 w-100" variant="dark" onClick={handleLogout}>Logout</Button>
                                        {user.roles == "Admin" && (
                                            <NavLink to="/manage/Manga">
                                                <Button className="mb-4 w-100" variant="dark">Manage Manga</Button>
                                            </NavLink>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/login">
                                            <Button className="mb-4 w-100" variant="dark">Login</Button>
                                        </NavLink>
                                        <NavLink to="/register">
                                            <Button className="mb-4 w-100" variant="light">Register</Button>
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

export default Header;