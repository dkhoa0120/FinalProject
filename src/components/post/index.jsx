import { useEffect, useState } from "react";
import { Dropdown, Modal, Row } from "react-bootstrap";
import "./styles.css";
import MobileModal from "./mobileModal";
import PCModal from "./pcModal";

export default function Post({ post, index }) {
  const DropDownOptions = () => (
    <Dropdown as={"span"}>
      <Dropdown.Toggle variant="outline" className="manga-list-options-toggle">
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Report</Dropdown.Item>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  const [targetPost, setTargetPost] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const calculateTimeDifference = (createdAt) => {
    const currentDate = new Date();
    const chapterDate = new Date(createdAt);
    const timeDifference = Math.abs(currentDate - chapterDate);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference < 50) {
      return `${minutesDifference} minutes ago`;
    } else if (minutesDifference < 1440) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} hours ago`;
    } else {
      const daysDifference = Math.floor(minutesDifference / 1440);
      return `${daysDifference} days ago`;
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div key={index} className="community-container">
        <div className="community-info">
          <div>
            <img
              className="avatar"
              src={post.user.avatarPath || "/img/avatar/default.png"}
              alt="Avatar"
            />
          </div>
          <div>
            <span className="comment-name">{post.user.name} </span>
            <span className="comment-time">
              {calculateTimeDifference(post.createdAt)}
            </span>
            <div className="text-limit-4">{post.content}</div>
            <div className="post-footer">
              {post.likeCount}
              <button className="post-react-button">
                <i className="fa-regular fa-thumbs-up" />
              </button>
              {post.dislikeCount}
              <button className="post-react-button">
                <i className="fa-regular fa-thumbs-down" />
              </button>
              {post.commentCount}
              <button
                className="post-react-button"
                onClick={() => setTargetPost(post)}
              >
                <i className="fa-regular fa-comment"></i>
              </button>
              <DropDownOptions />
            </div>
          </div>
        </div>
        {post.imageUrls && post.imageUrls.length > 0 && (
          <>
            <div
              className="post-image-container"
              onClick={() => setTargetPost(post)}
            >
              {post.imageUrls.length > 1 ? (
                <div className="post-image-quantity">
                  + {post.imageUrls.length - 1}
                </div>
              ) : null}

              <img src={post.imageUrls[0] || <p></p>} alt="Post" />
            </div>
          </>
        )}
        <div className="post-footer-mobile-view">
          {post.likeCount}
          <button className="post-react-button">
            <i className="fa-regular fa-thumbs-up" />
          </button>
          {post.dislikeCount}
          <button className="post-react-button">
            <i className="fa-regular fa-thumbs-down" />
          </button>
          {post.commentCount}
          <button
            className="post-react-button"
            onClick={() => setTargetPost(post)}
          >
            <i className="fa-regular fa-comment"></i>
          </button>
          <DropDownOptions />
        </div>
      </div>
      <hr className="display-in-mobile" />
      <Modal
        centered
        show={targetPost}
        onHide={() => setTargetPost(null)}
        size="xl"
      >
        <Modal.Body>
          <Row>
            {isMobile ? (
              <MobileModal
                calculateTimeDifference={calculateTimeDifference}
                DropDownOptions={DropDownOptions}
                post={targetPost}
                close={() => setTargetPost(null)}
              />
            ) : (
              <PCModal
                calculateTimeDifference={calculateTimeDifference}
                DropDownOptions={DropDownOptions}
                post={targetPost}
                close={() => setTargetPost(null)}
              />
            )}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
