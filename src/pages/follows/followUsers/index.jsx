import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import Followers from "./components/followers";
import Followings from "./components/followings";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function FollowUsers() {
  const sortOptions = ["Follower", "Following"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Followed Users - 3K Manga";
    if (user == null) {
      navigate("/login");
    }
  }, [navigate, user]);

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
          {sortOption === "Follower" && <Followers />}
          {sortOption === "Following" && <Followings />}
        </Row>
      </Container>
    </>
  );
}
