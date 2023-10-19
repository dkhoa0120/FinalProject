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
  const { selectedOption } = useParams();

  return (
    <>
      <Container fluid>
        {sortOptions.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === option ? "dark" : "light"}
            onClick={() => navigate(`/manage/requests/${selectedOption}`)}
          >
            {toLabel(option)}
          </Button>
        ))}
        <div className="manage-table">
          {selectedOption === "PromotionRequest" && <ManagePromotionReq />}
          {selectedOption === "MangaRequest" && <ManageMangaReq />}
          {selectedOption === "OtherRequest" && <ManageOtherReq />}
        </div>
      </Container>
    </>
  );
}
