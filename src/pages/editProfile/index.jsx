import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Account from "./components/account";
import Display from "./components/display";
import {} from "react-toastify";

export default function EditProfile() {
  const sortOptions = ["Account", "Display"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  return (
    <>
      <div style={{ paddingBottom: "20px" }}>
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
      <Container fluid className="general-container">
        {sortOption === "Account" && <Account />}
        {sortOption === "Display" && <Display />}
      </Container>
    </>
  );
}
