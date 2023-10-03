import { useEffect, useState } from "react";
import { Dropdown, Modal, Row } from "react-bootstrap";
import "./styles.css";
import MobileModal from "./mobileModal";
import PCModal from "./pcModal";
import PostOptions from "./postOptions";
import * as postReactApi from "../../service/api.react";
import { toast } from "react-toastify";
import { calculateTimeDifference } from "../../utilities/dateTimeHelper";
import PostContent from "./postContent";

export default function Post({ post, index }) {
  const [targetPost, setTargetPost] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [dislikeCount, setDisLikeCount] = useState(post.dislikeCount);
  const [reactFlag, setReactFlag] = useState(null);
  const postId = post?.id;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the handler initially

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchUserReactPost = async (postId) => {
    try {
      const response = await postReactApi.getUserReactPost(postId);
      const userReact = response.data;
      if (userReact) {
        setReactFlag(userReact);
      }
    } catch (error) {
      console.error("Error retrieving user rating:", error);
    }
  };

  useEffect(() => {
    fetchUserReactPost(postId);
  }, [postId]);

  const handleLikeClick = async () => {
    const nextReactFlag = "Like";
    try {
      if (reactFlag === nextReactFlag) {
        await postReactApi.deleteReactPost(postId);
        fetchUserReactPost(postId);
        setLikeCount(likeCount - 1);
        setReactFlag();
      } else {
        const formData = new FormData();
        formData.append("reactFlag", nextReactFlag);
        await postReactApi.putReactPost(postId, formData);
        setLikeCount(likeCount + 1);
        reactFlag && setDisLikeCount(dislikeCount - 1);
        setReactFlag(nextReactFlag);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to like!");
      }
    }
  };

  const handleDislikeClick = async () => {
    const nextReactFlag = "Dislike";
    try {
      if (reactFlag === nextReactFlag) {
        await postReactApi.deleteReactPost(postId);
        fetchUserReactPost(postId);
        setDisLikeCount(dislikeCount - 1);
        setReactFlag(null);
      } else {
        const formData = new FormData();
        formData.append("reactFlag", nextReactFlag);
        await postReactApi.putReactPost(postId, formData);
        reactFlag && setLikeCount(likeCount - 1);
        setDisLikeCount(dislikeCount + 1);
        setReactFlag(nextReactFlag);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to dislike!");
      }
    }
  };
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
              {likeCount || 0} &nbsp;
              <button className="btn-base" onClick={handleLikeClick}>
                {reactFlag === "Like" ? (
                  <i className="fa-solid fa-thumbs-up" />
                ) : (
                  <i className="fa-regular fa-thumbs-up" />
                )}
              </button>
              {dislikeCount || 0} &nbsp;
              <button className="btn-base" onClick={handleDislikeClick}>
                {reactFlag === "Dislike" ? (
                  <i className="fa-solid fa-thumbs-down" />
                ) : (
                  <i className="fa-regular fa-thumbs-down" />
                )}
              </button>
              {post.commentCount}
              <button
                className="post-react-button"
                onClick={() => setTargetPost(post)}
              >
                <i className="fa-regular fa-comment"></i>
              </button>
              <PostOptions />
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
              <MobileModal post={targetPost} close={() => setTargetPost(null)}>
                <PostContent
                  post={targetPost}
                  likeCount={likeCount}
                  dislikeCount={dislikeCount}
                  handleLike={handleLikeClick}
                  handleDislike={handleDislikeClick}
                  reactFlag={reactFlag}
                />
              </MobileModal>
            ) : (
              <PCModal post={targetPost} close={() => setTargetPost(null)}>
                <PostContent
                  post={targetPost}
                  likeCount={likeCount}
                  dislikeCount={dislikeCount}
                  handleLike={handleLikeClick}
                  handleDislike={handleDislikeClick}
                  reactFlag={reactFlag}
                />
              </PCModal>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
