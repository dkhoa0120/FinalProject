import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="error">
      <video autoPlay loop muted>
        <source src={"/img/error/video404.mp4"} />
      </video>
      <h1> Page not found</h1>
      <button className="button-23" onClick={() => navigate(-1)}>
        Return
      </button>
    </div>
  );
}
