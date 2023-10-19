import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import GroupRequests from "./components/groupRequests";
import PromotionRequests from "./components/promotionRequests";
import MangaRequests from "./components/mangaRequests";
import OtherRequest from "./components/otherRequests";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Requests() {
  const sortOptions = [
    "GroupRequest",
    "UploaderPromotionRequest",
    "MangaRequest",
    "OtherRequest",
  ];
  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };
  const navigate = useNavigate();
  const { selectedOption } = useParams();

  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = "Request - 3K Manga";
    if (user == null) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <Container fluid>
      {sortOptions.map((option, index) => (
        <Button
          key={index}
          variant={selectedOption === option ? "dark" : "light"}
          onClick={() => navigate(`/requests/${option}`)}
        >
          {toLabel(option)}
        </Button>
      ))}
      <div className="manage-table">
        {selectedOption === "GroupRequest" && <GroupRequests />}
        {selectedOption === "UploaderPromotionRequest" && <PromotionRequests />}
        {selectedOption === "MangaRequest" && <MangaRequests />}
        {selectedOption === "OtherRequest" && <OtherRequest />}
      </div>
    </Container>
  );
}
