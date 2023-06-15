import React, { useContext, useEffect, useState } from "react";
import { Col, InputGroup, Row, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../styles.css";
import { UserContext } from "../../../context/UserContext";
import { loginAPI } from "../../../service/Data.service";

function Login() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { loginContext, cookies } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.auth) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    if (!email || !password) {
      toast.error("Email/Password is required", {
        theme: "colored",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await loginAPI(data);
      if (response && response.data.token && response.data.expiration) {
        cookies.set("Token", response.data.token, {
          expires: new Date(response.data.expiration),
        });
        loginContext();
        navigate("/");
      }

      console.log(">>Get Response", response);
    } catch (error) {
      toast.error("Somethings went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <ToastContainer />
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
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
                <label>Remember Me</label>
              </Col>
              <Col xs={6} md={6}>
                <a href="!#">Forgot password?</a>
              </Col>
            </Row>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
