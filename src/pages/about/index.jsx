import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Rules from "./components/rules";
import AboutUs from "./components/aboutUs";

function About() {
  const sortOptions = ["About us", "Rules"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  return (
    <>
      {sortOptions.map((option, index) => (
        <Button
          key={index}
          variant={sortOption === option ? "dark" : "light"}
          onClick={() => setSortOption(option)}
        >
          {option}
        </Button>
      ))}
      <div className="general-container">
        {sortOption === "About us" && <AboutUs />}
        {sortOption === "Rules" && <Rules />}
      </div>
    </>
  );
}

export default About;
