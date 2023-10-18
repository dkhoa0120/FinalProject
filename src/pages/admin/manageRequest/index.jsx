import { useEffect } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ManagePromotionReq from "./components/managePromotionReq";
import ManageMangaReq from "./components/manageMangaReq";
import ManageOtherReq from "./components/manageOtherReq";

export default function ManageRequest() {
  const sortOptions = ["PromotionRequest", "MangaRequest", "OtherRequest"];
  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };
  const navigate = useNavigate();
  const { option } = useParams();
  const [sortOption, setSortOption] = useState(option || sortOptions[0]);
  useEffect(() => {
    navigate(`/manage/requests/${sortOption}`);
  }, [sortOption, navigate]);
  return (
    <>
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
          {sortOption === "PromotionRequest" && <ManagePromotionReq />}
          {sortOption === "MangaRequest" && <ManageMangaReq />}
          {sortOption === "OtherRequest" && <ManageOtherReq />}
        </div>
      </Container>
    </>
  );
}
