import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Followers from "./components/followers";
import Followings from "./components/followings";

export default function FollowUsers() {
  const sortOptions = ["Follower User", "Following User"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  return (
    <>
      <div>
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
      <Container fluid style={{ paddingTop: "10px" }}>
        <Row>
          {sortOption === "Follower User" && <Followers />}
          {sortOption === "Following User" && <Followings />}
        </Row>
      </Container>
    </>
  );
}
