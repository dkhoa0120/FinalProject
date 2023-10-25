import { useContext, useEffect, useState } from "react";
import { Col, InputGroup, Row, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles.css";
import { UserContext } from "../../../context/UserContext";
import * as accountApi from "../../../service/api.account";
import Cookies from "universal-cookie";

export default function Login() {
  const navigate = useNavigate();
  const { user, loadUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGif, setShowGif] = useState(false);

  // Update the document title
  useEffect(() => {
    document.title = "Sign In - 3K Manga";
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }
    setLoading(true);
    try {
      const response = await accountApi.signIn(data);
      if (response && response.data.token && response.data.expiration) {
        setShowGif(!showGif);
        new Cookies().set("Token", response.data.token, {
          path: "/",
          expires: new Date(response.data.expiration),
        });
        setTimeout(() => {
          loadUser();
          navigate(-1);
        }, 1300);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Wrong password or email!");
      } else if (error.response && error.response.status === 400) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong!");
      }
    }

    setLoading(false);
  };

  return (
    <>
      <div className="auth-form-container">
        {showGif && (
          <img
            className="anime-popup"
            src="/img/banner/animePopup.gif"
            alt="animePopup"
          />
        )}
        <img
          className="background"
          src="/img/banner/signup.png"
          alt="signup banner"
        />
        <form className="auth-form">
          <div className="auth-form-content">
            <h3 className="auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet? &nbsp;
              <NavLink to="/register">Sign Up</NavLink>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-envelope"></i>
                </InputGroup.Text>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  aria-label="Username"
                />
              </InputGroup>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-solid fa-lock"></i>
                </InputGroup.Text>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </InputGroup>
            </div>
            <div className="d-grid gap-2 mt-3">
              <Button
                variant="danger"
                className="mb-4 w-100"
                onClick={() => handleLogin()}
              >
                {loading && <i className="fas fa-spinner fa-spin"></i>} Login
              </Button>
            </div>
            <Row>
              <Col xs={6} md={6}>
                <input type="checkbox" />
                &nbsp;
                <span>Remember Me</span>
              </Col>
              <Col xs={6} md={6}>
                <a href="!#">Forgot password?</a>
              </Col>
            </Row>
          </div>
        </form>
      </div>
    </>
  );
}
