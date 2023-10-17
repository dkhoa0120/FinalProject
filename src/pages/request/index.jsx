import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import GroupRequests from "./components/groupRequests";
import PromotionRequests from "./components/promotionRequests";
import MangaRequests from "./components/mangaRequests";
import OtherRequest from "./components/otherRequests";
import "./styles.css";

export default function Requests() {
  const sortOptions = [
    "Group Request",
    "Promotion Request",
    "Manga Request",
    "Other Request",
  ];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
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
      <div className="manage-table">
        {sortOption === "Group Request" && <GroupRequests />}
        {sortOption === "Promotion Request" && <PromotionRequests />}
        {sortOption === "Manga Request" && <MangaRequests />}
        {sortOption === "Other Request" && <OtherRequest />}
      </div>
    </Container>
  );
}
