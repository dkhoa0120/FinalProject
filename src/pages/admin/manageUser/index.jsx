import { Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ManageUserReports from "./components/ManageReports";
import ManageUserRoles from "./components/ManageRoles";

export default function ManageUser() {
  const sortOptions = ["UserRole", "UserReport"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  // Update the document title
  useEffect(() => {
    document.title = "Manage User - 3K Manga";
  }, []);

  return (
    <>
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
        <div className="manage-table">
          {sortOption === "UserRole" && <ManageUserRoles />}
          {sortOption === "UserReport" && <ManageUserReports />}
        </div>
      </Container>
    </>
  );
}
