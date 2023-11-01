import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import AboutUs from "./components/aboutUs";
import UploadRules from "./components/uploadRules";
import CommunityRules from "./components/communityRules";
import Privacy from "./components/privacy";
import "./styles.css";

function About() {
  const sortOptions = [
    "About us",
    "Upload Rules",
    "Community Rules",
    "Data Privacy Policy",
  ];
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  // Update the document title
  useEffect(() => {
    document.title = "Site Rules - 3K Manga";
  }, []);
  return (
    <Container fluid>
      <div className="notification-button">
        {sortOptions.map((option, index) => (
          <Button
            key={index}
            variant={sortOption === option ? "dark" : "light"}
            onClick={() => setSortOption(option)}
          >
            {option}
          </Button>
        ))}
      </div>
      <div
        className="general-container"
        style={{ marginTop: "10px", padding: "20px" }}
      >
        {sortOption === "About us" && <AboutUs />}
        {sortOption === "Upload Rules" && <UploadRules />}
        {sortOption === "Community Rules" && <CommunityRules />}
        {sortOption === "Data Privacy Policy" && <Privacy />}
      </div>
    </Container>
  );
}

export default About;
