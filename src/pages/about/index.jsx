import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import AboutUs from "./components/aboutUs";
import UploadRules from "./components/uploadRules";
import CommunityRules from "./components/communityRules";
import "./styles.css";

function About() {
  const sortOptions = ["About us", "Upload Rules", "Community Rules"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  // Update the document title
  useEffect(() => {
    document.title = "Site Rules - 3K Manga";
  }, []);
  return (
    <Container fluid>
      {sortOptions.map((option, index) => (
        <Button
          key={index}
          variant={sortOption === option ? "dark" : "light"}
          onClick={() => setSortOption(option)}
        >
          {option}
        </Button>
      ))}
      <div className="general-container" style={{ marginTop: "10px" }}>
        {sortOption === "About us" && <AboutUs />}
        {sortOption === "Upload Rules" && <UploadRules />}
        {sortOption === "Community Rules" && <CommunityRules />}
      </div>
    </Container>
  );
}

export default About;
