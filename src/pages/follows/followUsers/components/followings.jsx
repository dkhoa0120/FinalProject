import { Col, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../styles.css";
import * as followApi from "../../../../service/api.follow";

export default function Followings() {
  const [followings, setFollowings] = useState(null);

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        const result = await followApi.getFollowingUsers();
        setFollowings(result.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setFollowings(null);
        }
      }
    };
    fetchFollowingUsers();
  }, []);

  return (
    <>
      {followings ? (
        followings.map((f) => {
          return (
            <Col xs={6} md={3}>
              <div className="follow-user-container">
                <img
                  className="group-avatar"
                  src={f.avatarPath || "/img/avatar/defaultGroup.jpg"}
                  alt="avatar"
                ></img>
                <div className="group-info">
                  <p className="text-limit-2">
                    <b>{f.name}</b>
                  </p>
                </div>

                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline"
                    className="manga-list-options-toggle"
                  >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Report</Dropdown.Item>
                    <Dropdown.Item>Unfollow</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          );
        })
      ) : (
        <p></p>
      )}
    </>
  );
}
