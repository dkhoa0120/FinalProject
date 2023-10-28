import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import * as requestApi from "../../service/api.request";
import { Link, useParams } from "react-router-dom";
import * as groupApi from "../../service/api.group";
import ManageMembers from "./components/ManageMembers";
import RequestMembers from "./components/RequestMembers";

export default function ManageGroup() {
  const [groupDetails, setGroupDetails] = useState(null);
  const { groupId } = useParams();
  const sortOptions = ["Manage Member", "Request Member"];
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  useEffect(() => {
    const getGroupDetail = async (id) => {
      try {
        const result = await groupApi.getGroupInfo(id);
        document.title = `Group - 3K Manga`;
        setGroupDetails(result.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(error.response);
        }
      }
    };
    getGroupDetail(groupId);
  }, [groupId]);

  useEffect(() => {
    const fetchGroupRequests = async (id) => {
      try {
        await requestApi.getJoinGroupRequest(id);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log(error.response);
        }
      }
    };
    fetchGroupRequests(groupId);
  }, [groupId]);

  return (
    <Container fluid>
      <div className="group-name">
        <Link to={`/groups/${groupId}/Uploads`}>
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
            {option}
          </Button>
        ))}
      </div>
      {sortOption === "Manage Member" && <ManageMembers groupId={groupId} />}
      {sortOption === "Request Member" && <RequestMembers groupId={groupId} />}
    </Container>
  );
}
