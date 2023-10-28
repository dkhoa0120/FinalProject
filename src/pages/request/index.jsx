import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import GroupRequests from "./components/groupRequests";
import PromotionRequests from "./components/promotionRequests";
import MangaRequests from "./components/mangaRequests";
import OtherRequest from "./components/otherRequests";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Requests() {
  const sortOptions = [
    "JoinGroupRequest",
    "PromotionRequest",
    "MangaRequest",
    "OtherRequest",
  ];

  const navigate = useNavigate();
  const { selectedOption } = useParams();

  useEffect(() => {
    document.title = "Request - 3K Manga";
  }, []);

  return (
    <Container fluid>
      <div className="notification-button">
        {sortOptions.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === option ? "dark" : "light"}
            onClick={() => navigate(`/requests/${option}`)}
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="manage-table">
        {selectedOption === "JoinGroupRequest" && <GroupRequests />}
        {selectedOption === "PromotionRequest" && <PromotionRequests />}
        {selectedOption === "MangaRequest" && <MangaRequests />}
        {selectedOption === "OtherRequest" && <OtherRequest />}
      </div>
    </Container>
  );
}
