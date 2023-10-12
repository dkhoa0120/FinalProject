import { useState } from "react";
import { Button, Container } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ManageMembers from "./components/ManageMembers";
import RequestMembers from "./components/RequestMembers";

export default function ManageGroup() {
  const [groupDetails, setGroupDetails] = useState(null);
  const { groupId } = useParams();
  const sortOptions = ["Manage Member", "Request Member"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const toLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <Container fluid>
      <ToastContainer />
      <div className="group-name">
        <Link to={`/groups/${groupId}`}>
          <button className="return-button">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </Link>{" "}
        {groupDetails?.name} Group
      </div>
      <div style={{ paddingBottom: "20px" }}>
        {sortOptions.map((option, index) => (
          <Button
            key={index}
            variant={sortOption === option ? "dark" : "light"}
            onClick={() => setSortOption(option)}
          >
            {toLabel(option)}
          </Button>
        ))}
      </div>
      {sortOption === "Manage Member" && <ManageMembers groupId={groupId} />}
      {sortOption === "Request Member" && <RequestMembers groupId={groupId} />}
    </Container>
  );
}
