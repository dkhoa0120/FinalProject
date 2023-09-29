import { useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  Collapse,
  Modal,
  ModalBody,
  ModalFooter,
  Dropdown,
} from "react-bootstrap";
import "./style.css";
import * as commentApi from "../../service/api.comment";
import * as commentReactApi from "../../service/api.commentReact";
import { UserContext } from "../../context/UserContext";
import { EditCommentForm, ReplyCommentForm } from "./commentForm";
import { Link } from "react-router-dom";

export default function Comment({ comment, editComment, removeComment }) {
  const [childComments, setChildComments] = useState(null);
  const [showChildComments, setShowChildComments] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [dislikeCount, setDisLikeCount] = useState(comment.dislikeCount);
  const [childCommentCount, setChildCommentCount] = useState(
    comment.childCommentCount
  );
  const [reactFlag, setReactFlag] = useState(0);
  const [reply, setReply] = useState(false);
  const [showModal, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchUserReactComment(comment.id);
  }, [comment.id]);

  const handleToggleReplies = async () => {
    if (!childComments) {
      const result = await commentApi.getChildComments(comment.id);
      setChildComments(result.data.itemList);
    }
    setShowChildComments(!showChildComments);
  };

  const handleReplyComment = () => {
    setReply(!reply);
  };

  const handleDeleteComment = async () => {
    try {
      await removeComment(comment.id);
      toast.success("Comment has been deleted");
      setShow(false);
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  const fetchUserReactComment = async (commentId) => {
    try {
      const response = await commentReactApi.getUserReactComment(commentId);
      const userReact = response.data;
      if (userReact) {
        setReactFlag(userReact);
      }
    } catch (error) {
      console.error("Error retrieving user rating:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (reactFlag === 0) {
        const formData = new FormData();
        formData.append("reactFlag", 1);
        await commentReactApi.postReactComment(comment.id, formData);
        setLikeCount(likeCount + 1);
        setReactFlag(1);
      }
      if (reactFlag === 1) {
        await commentReactApi.deleteReactComment(comment.id);
        fetchUserReactComment(comment.id);
        setLikeCount(likeCount - 1);
        setReactFlag(0);
      }
      if (reactFlag === -1) {
        const formData = new FormData();
        formData.append("reactFlag", 1);
        await commentReactApi.putReactComment(comment.id, formData);
        setLikeCount(likeCount + 1);
        setDisLikeCount(dislikeCount - 1);
        setReactFlag(1);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to like!");
      }
    }
  };

  const handleDislikeClick = async () => {
    try {
      if (reactFlag === 0) {
        const formData = new FormData();
        formData.append("reactFlag", -1);
        await commentReactApi.postReactComment(comment.id, formData);
        setDisLikeCount(dislikeCount + 1);
        setReactFlag(-1);
      }
      if (reactFlag === -1) {
        await commentReactApi.deleteReactComment(comment.id);
        fetchUserReactComment(comment.id);
        setDisLikeCount(dislikeCount - 1);
        setReactFlag(0);
      }
      if (reactFlag === 1) {
        const formData = new FormData();
        formData.append("reactFlag", -1);
        await commentReactApi.putReactComment(comment.id, formData);
        setLikeCount(likeCount - 1);
        setDisLikeCount(dislikeCount + 1);
        setReactFlag(-1);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to dislike!");
      }
    }
  };

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

  const addChildComment = (comment) => {
    if (childComments != null) {
      setChildComments([comment, ...childComments]);
    } else {
      setChildCommentCount(childCommentCount + 1);
    }
  };

  const editChildComment = (commentId, commentContent) =>
    setChildComments(
      childComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: commentContent }
          : comment
      )
    );

  const removeChildComment = async (commentId) => {
    await commentApi.deleteComment(commentId);
    setChildComments(
      childComments.filter((comment) => comment.id !== commentId)
    );
  };

  if (!comment) {
    return null;
  }
  return (
    <div className="mt-2">
      {isEditing ? (
        <EditCommentForm
          comment={comment}
          editCommentInState={editComment}
          stopEdit={() => setIsEditing(false)}
        />
      ) : (
        <div className="d-flex gap-3">
          <div>
            <Link to={`/profile/${comment.user.id}`} className="card-link">
              <img
                className="avatar"
                src={comment.user.avatarPath || "/img/avatar/default.png"}
                alt="Avatar"
              />
            </Link>
          </div>
          <div className="comment-content">
            <div>
              <Link to={`/profile/${comment.user.id}`} className="card-link">
                <span className="comment-name">{comment.user.name} </span>
              </Link>
              <span
                className="comment-time"
                title={new Date(comment.createdAt).toLocaleString()}
              >
                {calculateTimeDifference(comment.createdAt)}
              </span>
            </div>
            <div>{comment.content}</div>
            <div className="comment-footer">
              <div className="comment-reacts">
                <div>
                  {likeCount || 0} &nbsp;
                  <button className="btn-base" onClick={handleLikeClick}>
                    {reactFlag === 1 ? (
                      <i className="fa-solid fa-thumbs-up" />
                    ) : (
                      <i className="fa-regular fa-thumbs-up" />
                    )}
                  </button>
                </div>
                <div>
                  {dislikeCount || 0} &nbsp;
                  <button className="btn-base" onClick={handleDislikeClick}>
                    {reactFlag === -1 ? (
                      <i className="fa-solid fa-thumbs-down" />
                    ) : (
                      <i className="fa-regular fa-thumbs-down" />
                    )}
                  </button>
                </div>
              </div>
              <button
                className="btn-base btn-toggle-reply"
                onClick={handleReplyComment}
              >
                Reply
              </button>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline"
                  className="comment-options-toggle"
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {user && user.id === comment.user.id ? (
                    <>
                      <Dropdown.Item onClick={() => setIsEditing(true)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <div onClick={() => setShow(true)}>Delete</div>
                      </Dropdown.Item>
                      <Modal show={showModal} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Delete Comment</Modal.Title>
                        </Modal.Header>
                        <ModalBody>{comment.content}</ModalBody>
                        <ModalFooter>
                          <button
                            style={{
                              borderWidth: "0",
                              backgroundColor: "white",
                              fontSize: "15px",
                              color: "#730000",
                            }}
                            onClick={handleDeleteComment}
                          >
                            Confirm Delete
                          </button>
                        </ModalFooter>
                      </Modal>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item>
                        <div onClick={() => setShow(true)}>Report</div>
                        <Modal show={showModal} onHide={() => setShow(false)}>
                          <Modal.Header closeButton>
                            <Modal.Title>Report</Modal.Title>
                          </Modal.Header>
                          <ModalBody>
                            {comment.content}
                            <hr></hr>
                            <div>
                              <input
                                type="text"
                                className="form-control mr-3"
                                placeholder="..."
                              ></input>
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            <button
                              style={{
                                borderWidth: "0",
                                backgroundColor: "white",
                                fontSize: "15px",
                                color: "#730000",
                              }}
                              onClick={() => setShow(false)}
                            >
                              Accept
                            </button>
                          </ModalFooter>
                        </Modal>
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {childCommentCount > 0 && (
              <button
                className="btn-base btn-toggle-children"
                onClick={handleToggleReplies}
              >
                {showChildComments ? (
                  <i className="fa-solid fa-arrow-up" />
                ) : (
                  <i className="fa-solid fa-arrow-down" />
                )}{" "}
                {childCommentCount}{" "}
                {childCommentCount >= 2 ? "replies" : "reply"}
              </button>
            )}
            {reply && (
              <ReplyCommentForm
                comment={comment}
                addReplyInState={addChildComment}
                stopReply={() => setReply(false)}
              />
            )}
            {childCommentCount > 0 && (
              <Collapse in={showChildComments}>
                <div>
                  {childComments?.map((c) => (
                    <Comment
                      key={c.id}
                      comment={c}
                      editComment={editChildComment}
                      removeComment={removeChildComment}
                    />
                  ))}
                </div>
              </Collapse>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
