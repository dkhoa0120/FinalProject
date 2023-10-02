import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import {
  Button,
  Col,
  Dropdown,
  Modal,
  Row,
  ToastContainer,
} from "react-bootstrap";
import CommentSection from "../../../components/commentSection";
import { useParams } from "react-router-dom";
import * as postApi from "../../../service/api.post";
import CreatePostModal from "./CreatePostModal";

export default function Community() {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState(null);
  const [targetPost, setTargetPost] = useState(null);
  const { userId } = useParams();

  console.log("newTarget", targetPost);

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

  const onPostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  useEffect(() => {
    const fetchUserPosts = async (userId) => {
      const res = await postApi.getPosts(userId);
      setPosts(res.data);
    };
    fetchUserPosts(userId);
  }, [userId]);

  return (
    <>
      <ToastContainer />
      <div className="upload-post-container">
        {user && user?.id === userId && (
          <div className="d-flex gap-2" style={{ margin: "20px" }}>
            <img
              className="avatar"
              src={user.avatarPath || "/img/avatar/default.png"}
              alt="Avatar"
            />
            <button
              style={{
                width: "100%",
                border: "none",
                borderRadius: "50px",
                textAlign: "start",
              }}
              onClick={() => setShowCreatePost(true)}
            >
              <span style={{ marginLeft: "10px" }}>
                What's on your mind, {user.name}?
              </span>
            </button>
          </div>
        )}
      </div>
      {posts ? (
        posts.map((post, index) => (
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
                {" "}
                <div
                  className="post-image-container"
                  onClick={() => setShow(!show)}
                >
                  <div className="post-image-quantity">+12</div>
                  <img
                    className="avatar"
                    src={post.imageUrls[0] || <p></p>}
                    alt="Post"
                  />
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
              <button
                className="post-react-button"
                onClick={() => setTargetPost(post)}
              >
                <i className="fa-regular fa-comment"></i>
              </button>
              <DropDownOptions />
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}

      <hr className="display-in-mobile" />

      <Modal
        centered
        show={targetPost}
        onHide={() => setTargetPost(null)}
        size="xl"
      >
        <Modal.Body>
          <Row>
            {/* Comment Modal in Mobile */}
            <Col md={6}>
              <div className="modal-users-info-mobile-view">
                <div>
                  <img
                    className="avatar"
                    src={
                      targetPost?.user.avatarPath || "/img/avatar/default.png"
                    }
                    alt="Avatar"
                    style={{ margin: "10px 10px 10px 0" }}
                  />
                  <span className="comment-name">{targetPost?.user.name}</span>
                  <span className="comment-time">
                    {calculateTimeDifference(targetPost?.createdAt)}
                  </span>
                </div>
                <span className="close-com" onClick={() => setTargetPost(null)}>
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </div>

              {targetPost?.imageUrls && targetPost.imageUrls.length > 0 && (
                <>
                  {" "}
                  <div className="modal-community-image">
                    <div className="arrow-left">
                      <i className="fa-solid fa-angle-left" />
                    </div>
                    <div className="post-image-container">
                      <img
                        className="avatar"
                        src={targetPost.imageUrls[0] || <p></p>}
                        alt="Post"
                      />
                    </div>
                    <div className="arrow-right">
                      <i className="fa-solid fa-angle-right" />
                    </div>
                  </div>
                </>
              )}
              <>
                {" "}
                <div className="modal-community-image">
                  <div className="arrow-left">
                    <i className="fa-solid fa-angle-left" />
                  </div>
                  <div className="post-image-container">
                    <img src="/img/error/coverNotFound.png" alt="Post" />
                  </div>
                  <div className="arrow-right">
                    <i className="fa-solid fa-angle-right" />
                  </div>
                </div>
              </>
            </Col>

            {/* Comment Modal in PC */}
            <Col md={6}>
              <div className="modal-community-info">
                <div>
                  <div className="modal-user-info">
                    <div>
                      <img
                        className="avatar"
                        src={
                          targetPost?.user.avatarPath ||
                          "/img/avatar/default.png"
                        }
                        alt="Avatar"
                        style={{ margin: "10px 10px 10px 0" }}
                      />
                      <span className="comment-name">
                        {targetPost?.user.name}
                      </span>
                      <span className="comment-time">
                        {calculateTimeDifference(targetPost?.createdAt)}
                      </span>
                    </div>
                    <div
                      className="close-com"
                      onClick={() => setTargetPost(null)}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                  </div>
                  <p style={{ marginBottom: "5px" }}>{targetPost?.content}</p>
                  <div className="post-footer">
                    {targetPost?.likeCount}
                    <button className="post-react-button">
                      <i className="fa-regular fa-thumbs-up" />
                    </button>
                    {targetPost?.dislikeCount}
                    <button className="post-react-button">
                      <i className="fa-regular fa-thumbs-down" />
                    </button>
                    <DropDownOptions />
                  </div>

                  {/* <CommentSection type="chapter" typeId={chapterId} /> */}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* Create Post Modal */}
      <CreatePostModal
        show={showCreatePost}
        onHide={() => setShowCreatePost(false)}
        onPostCreated={onPostCreated}
      />
    </>
  );
}
