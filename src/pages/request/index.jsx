import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import GroupRequests from "./components/groupRequests";
import PromotionRequests from "./components/promotionRequests";

export default function Requests() {
  const sortOptions = ["Group Request", "Promotion Request"];
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
      </div>
    </Container>
  );
}
