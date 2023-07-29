import React, { useEffect, useContext, useState } from "react";
import {
  Collapse,
  Modal,
  ModalBody,
  ModalFooter,
  Dropdown,
} from "react-bootstrap";
import CommentForm from "./commentForm";
import "./style.css";
import { getUserChildComment } from "../../service/api.comment";
import {
  deleteReactComment,
  getUserReactComment,
  postReactComment,
  putReactComment,
} from "../../service/api.commentreact";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import { EditCommentForm } from "./editCommentForm";

export function Comment({ comment, editComment }) {
  const { user } = useContext(UserContext);
  const [childComments, setChildComments] = useState(null);
  const [showChildComments, setShowChildComments] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [dislikeCount, setDisLikeCount] = useState(comment.dislikeCount);
  const [reactFlag, setReactFlag] = useState(0);
  const [reply, setReply] = useState(false);
  const [showModal, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleReplies = async () => {
    if (!childComments) {
      const result = await getUserChildComment(comment.id);
      console.log("result", result);
      setChildComments(result.data.itemList);
    }
    setShowChildComments(!showChildComments);
  };

  const handleReplyComment = () => {
    setReply(!reply);
  };

  const fetchUserReactComment = async (commentId) => {
    try {
      const response = await getUserReactComment(commentId);
      const userReact = response.data;
      if (userReact) {
        setReactFlag(userReact);
      }
    } catch (error) {
      console.error("Error retrieving user rating:", error);
    }
  };

  useEffect(() => {
    fetchUserReactComment(comment.id);
  }, [comment.id]);

  const handleLikeClick = async () => {
    try {
      if (reactFlag === 0) {
        const formData = new FormData();
        formData.append("reactFlag", 1);
        await postReactComment(comment.id, formData);
        setLikeCount(likeCount + 1);
        setReactFlag(1);
      }
      if (reactFlag === 1) {
        await deleteReactComment(comment.id);
        fetchUserReactComment(comment.id);
        setLikeCount(likeCount - 1);
        setReactFlag(0);
      }
      if (reactFlag === -1) {
        const formData = new FormData();
        formData.append("reactFlag", 1);
        await putReactComment(comment.id, formData);
        setLikeCount(likeCount + 1);
        setDisLikeCount(dislikeCount - 1);
        setReactFlag(1);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in!");
      }
    }
  };

  const handleDislikeClick = async () => {
    try {
      if (reactFlag === 0) {
        const formData = new FormData();
        formData.append("reactFlag", -1);
        await postReactComment(comment.id, formData);
        setDisLikeCount(dislikeCount + 1);
        setReactFlag(-1);
      }
      if (reactFlag === -1) {
        await deleteReactComment(comment.id);
        fetchUserReactComment(comment.id);
        setDisLikeCount(dislikeCount - 1);
        setReactFlag(0);
      }
      if (reactFlag === 1) {
        const formData = new FormData();
        formData.append("reactFlag", -1);
        await putReactComment(comment.id, formData);
        setLikeCount(likeCount - 1);
        setDisLikeCount(dislikeCount + 1);
        setReactFlag(-1);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in!");
      }
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  if (!comment) {
    return null;
  }
  return (
    <div className="mt-2">
      {isEditing ? (
        <EditCommentForm
          setIsEditing={setIsEditing}
          editComment={editComment}
          comment={comment}
        />
      ) : (
        <div className="d-flex align-items-start">
          <img
            className="avatar"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            width="38"
            alt="Avatar"
          />
          <div className="comment-content">
            <div className="comment-name">{comment.user.name}</div>
            <div>{comment.content}</div>
            <div className="comment-footer">
              <div>
                {likeCount || 0} &nbsp;
                <button className="btn-base btn-like" onClick={handleLikeClick}>
                  {reactFlag === 1 ? (
                    <i className="fa-solid fa-thumbs-up" />
                  ) : (
                    <i className="fa-regular fa-thumbs-up" />
                  )}
                </button>
                {dislikeCount || 0} &nbsp;
                <button
                  className="btn-base btn-dislike"
                  onClick={handleDislikeClick}
                >
                  {reactFlag === -1 ? (
                    <i className="fa-solid fa-thumbs-down" />
                  ) : (
                    <i className="fa-regular fa-thumbs-down" />
                  )}
                </button>
                <button
                  className="btn-base btn-toggle-reply"
                  onClick={handleReplyComment}
                >
                  Reply
                </button>
                <span title={new Date(comment.createdAt).toLocaleString()}>
                  <i className="fa-regular fa-clock"></i>{" "}
                  {calculateTimeDifference(comment.createdAt)}
                </span>
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline"
                  id="button-toggle"
                  style={{ marginTop: "5px" }}
                >
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {user && user.id === comment.user.id ? (
                    <>
                      <Dropdown.Item onClick={() => setIsEditing(true)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item>Delete</Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item>
                        <div onClick={handleShow}>Report</div>
                        <Modal show={showModal} onHide={handleClose}>
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
                              onClick={handleClose}
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
            <div>
              {comment.childCommentCount > 0 && (
                <>
                  &nbsp;&nbsp;
                  <button
                    className="btn-base btn-toggle-children"
                    onClick={handleToggleReplies}
                  >
                    {showChildComments ? (
                      <i className="fa-solid fa-arrow-up" />
                    ) : (
                      <i className="fa-solid fa-arrow-down" />
                    )}{" "}
                    {comment.childCommentCount}{" "}
                    {comment.childCommentCount >= 2 ? "replies" : "reply"}
                  </button>
                </>
              )}
            </div>
            <Collapse in={reply}>
              <div id="handleReplyComment">
                <CommentForm />
              </div>
            </Collapse>
            {comment.childCommentCount > 0 && (
              <Collapse in={showChildComments}>
                <div id="reply-comments">
                  {childComments?.map((c) => (
                    <Comment key={c.id} comment={c} />
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

function CommentList({ comments, editComment }) {
  console.log("commentList", comments);

  if (!comments) {
    return null;
  }

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} editComment={editComment} />
      ))}
    </div>
  );
}

export default CommentList;
