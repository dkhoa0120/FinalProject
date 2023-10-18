import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import GroupRequests from "./components/groupRequests";
import PromotionRequests from "./components/promotionRequests";
import MangaRequests from "./components/mangaRequests";
import OtherRequest from "./components/otherRequests";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Requests() {
  const sortOptions = [
    "GroupRequest",
    "PromotionRequest",
    "MangaRequest",
    "OtherRequest",
  ];
  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };
  const navigate = useNavigate();
  const { option } = useParams();
  const [sortOption, setSortOption] = useState(option || sortOptions[0]);

  useEffect(() => {
    navigate(`/requests/${sortOption}`);
  }, [sortOption, navigate]);
  return (
    <Container fluid>
      {sortOptions.map((option, index) => (
        <Button
          key={index}
          variant={sortOption === option ? "dark" : "light"}
          onClick={() => setSortOption(option)}
        >
          {toLabel(option)}
        </Button>
      ))}
      <div className="manage-table">
        {sortOption === "GroupRequest" && <GroupRequests />}
        {sortOption === "PromotionRequest" && <PromotionRequests />}
        {sortOption === "MangaRequest" && <MangaRequests />}
        {sortOption === "OtherRequest" && <OtherRequest />}
      </div>
    </Container>
  );
}
