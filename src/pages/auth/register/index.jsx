import React, { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../styles.css";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useEffect } from "react";
import { signIn, signUp } from "../../../service/api.auth";
import Cookies from "universal-cookie";

export default function Register() {
  const navigate = useNavigate();
  const { loadUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required", { theme: "colored" });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { theme: "colored" });
      return;
    }
    const data = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      await signUp(data);

      const loginData = {
        email: email,
        password: password,
      };
      const response = await signIn(loginData);
      if (response && response.data.token && response.data.expiration) {
        new Cookies().set("Token", response.data.token, {
          expires: new Date(response.data.expiration),
        });
        loadUser();
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to register or log in");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="auth-form-container">
        <img className="background" src="/img/banner/signup.jpg" alt="" />
        <form className="auth-form">
          <div className="auth-form-content">
            <h3 className="auth-form-title">Sign Up A New Account</h3>
            <div className="text-center">
              Already have account? &nbsp;
              <NavLink to="/login">Sign In</NavLink>
            </div>
            <div className="form-group mt-3">
              <label>Name</label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-sharp fa-solid fa-user"></i>
                </InputGroup.Text>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  aria-label="Name"
                />
              </InputGroup>
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
                  aria-label="Email"
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
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <i className="fa-sharp fa-solid fa-key"></i>
                </InputGroup.Text>
                <Form.Control
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                />
              </InputGroup>
            </div>
            <div className="d-grid gap-2 mt-3">
              <Button
                variant="danger"
                className="mb-4 w-100"
                onClick={handleRegister}
              >
                Register
              </Button>
            </div>
            <div className="text-center">
              <a href="!#">Forgot password?</a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
