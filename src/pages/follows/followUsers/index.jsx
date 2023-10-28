import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Followers from "./components/followers";
import Followings from "./components/followings";
import { useNavigate } from "react-router-dom";

export default function FollowUsers() {
  const sortOptions = ["Follower", "Following"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Followed Users - 3K Manga";
  }, [navigate]);

  return (
    <Container fluid>
      <div style={{ paddingBottom: "10px" }}>
        {sortOptions.map((option, index) => (
          <Button
            key={index}
            variant={sortOption === option ? "dark" : "light"}
            onClick={() => setSortOption(option)}
          >
            {option}
          </Button>
        ))}
      </div>
      <Row>
        {sortOption === "Follower" && <Followers />}
        {sortOption === "Following" && <Followings />}
      </Row>
    </Container>
  );
}
