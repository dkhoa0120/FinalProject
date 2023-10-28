import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ManagePromotionReq from "./components/managePromotionReq";
import ManageMangaReq from "./components/manageMangaReq";
import ManageOtherReq from "./components/manageOtherReq";
import { useEffect } from "react";

export default function ManageRequest() {
  const sortOptions = ["PromotionRequest", "MangaRequest", "OtherRequest"];

  const navigate = useNavigate();
  const { selectedOption } = useParams();

  useEffect(() => {
    document.title = "Manage Request - 3K Manga";
  }, []);

  return (
    <>
      <Container fluid>
        <div className="notification-button">
          {sortOptions.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === option ? "dark" : "light"}
              onClick={() => navigate(`/manage/requests/${option}`)}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="manage-table">
          {selectedOption === "PromotionRequest" && <ManagePromotionReq />}
          {selectedOption === "MangaRequest" && <ManageMangaReq />}
          {selectedOption === "OtherRequest" && <ManageOtherReq />}
        </div>
      </Container>
    </>
  );
}
