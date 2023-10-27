import { Button, Container } from "react-bootstrap";
import { useEffect } from "react";
import ManageUserReports from "./components/ManageReports";
import ManageUserRoles from "./components/ManageRoles";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageUser() {
  const sortOptions = ["UserRole", "UserReport"];

  const navigate = useNavigate();
  const { selectedOption } = useParams();

  useEffect(() => {
    document.title = "Manage User - 3K Manga";
  }, []);

  return (
    <>
      <Container fluid>
        {sortOptions.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === option ? "dark" : "light"}
            onClick={() => navigate(`/manage/users/${option}`)}
          >
            {option}
          </Button>
        ))}
        <div className="manage-table">
          {selectedOption === "UserRole" && <ManageUserRoles />}
          {selectedOption === "UserReport" && <ManageUserReports />}
        </div>
      </Container>
    </>
  );
}
