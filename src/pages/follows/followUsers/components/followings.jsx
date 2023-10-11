import { Col, Dropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../../styles.css";
import * as followApi from "../../../../service/api.follow";

export default function Followings() {
  const [followings, setFollowings] = useState(null);
  const [loadingPost, setLoadingPost] = useState(false);
  const [outOfPost, setOutOfPost] = useState(false);

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

  const handleSeeMoreFollowings = async (createdAtCursor) => {
    try {
      const newFollowings = await followApi.getFollowingUsers({
        createdAtCursor: createdAtCursor?.createdAt,
      });
      setFollowings([...loadingPost, ...newFollowings.data]);

      // Set outOfComment to disable loading more comment in scroll event below
      if (newFollowings.data.length > 0) {
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
        followings.length > 0 &&
        !outOfPost
      ) {
        setLoadingPost(true);
        setTimeout(() => {
          handleSeeMoreFollowings(followings[followings.length - 1]);
          setLoadingPost(false);
        }, 1000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followings]);

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

      {loadingPost && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </>
  );
}
