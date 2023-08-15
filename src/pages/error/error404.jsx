import { useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  // Update the document title
  useEffect(() => {
    document.title = "Error - 3K Manga";
  }, []);

  return (
    <div className="error">
      <img src={"/img/error/video404.gif"} alt="error404" />
      <h1> Page not found</h1>
      <button className="button-23" onClick={() => navigate(-1)}>
        Return
      </button>
    </div>
  );
}
