import { Col, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../styles.css";
import * as followApi from "../../../../service/api.follow";

export default function Followers() {
  const [followers, setFollowers] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);
  const [outOfPost, setOutOfPost] = useState(false);

  useEffect(() => {
    const fetchFollowerUsers = async () => {
      try {
        const res = await followApi.getFollowerUsers();
        console.log(res.data);
        setFollowers(res.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setFollowers(null);
        }
      }
    };
    fetchFollowerUsers();
  }, []);

  const handleSeeMoreFollowers = async (followedAtCursor) => {
    try {
      const newFollowers = await followApi.getFollowerUsers({
        followedAtCursor,
      });
      setFollowers([...followers, ...newFollowers.data]);

      // Set outOfComment to disable loading more comment in scroll event below
      if (newFollowers.data.length > 0) {
        setOutOfPost(false);
      } else {
        setOutOfPost(true);
      }
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if you've scrolled to the bottom
      if (
        window.innerHeight + Math.round(window.scrollY) >=
          document.body.offsetHeight &&
        followers.length > 0 &&
        !outOfPost
      ) {
        setLoadingPost(true);
        setTimeout(() => {
          handleSeeMoreFollowers(followers[followers.length - 1]?.followedAt);
          setLoadingPost(false);
        }, 1000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followers]);

  return (
    <>
      {followers ? (
        followers.map((f) => {
          return (
            <Col xs={12} md={3}>
              <div className="follow-user-container">
                <img
                  className="group-avatar"
                  src={f.user.avatarPath || "/img/avatar/default.png"}
                  alt="avatar"
                ></img>

                <div className="group-info">
                  <p className="text-limit-2">
                    <b>{f.user.name}</b>
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

      {loadingPost && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </>
  );
}
