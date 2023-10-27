import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Collapse, Modal, Dropdown, Button } from "react-bootstrap";
import "./style.css";
import * as commentApi from "../../service/api.comment";
import * as commentReactApi from "../../service/api.react";
import { UserContext } from "../../context/UserContext";
import { EditCommentForm, ReplyCommentForm } from "./commentForm";
import { Link } from "react-router-dom";
import { calculateTimeDifference } from "../../utilities/dateTimeHelper";

export default function Comment({ comment, editComment, removeComment }) {
  const [childComments, setChildComments] = useState(null);
  const [showChildComments, setShowChildComments] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [dislikeCount, setDisLikeCount] = useState(comment.dislikeCount);
  const [childCommentCount, setChildCommentCount] = useState(
    comment.childCommentCount
  );
  const [reactFlag, setReactFlag] = useState(comment.userReactFlag);
  const [reply, setReply] = useState(false);
  const [showModal, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(UserContext);

  const handleToggleReplies = async () => {
    if (!childComments) {
      const result = await commentApi.getChildComments(comment.id);
      setChildComments(result.data);
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

  const handleLikeClick = async () => {
    const nextReactFlag = "Like";
    try {
      if (reactFlag === nextReactFlag) {
        await commentReactApi.deleteReactComment(comment.id);
        setLikeCount(likeCount - 1);
        setReactFlag();
      } else {
        const formData = new FormData();
        formData.append("reactFlag", nextReactFlag);
        await commentReactApi.putReactComment(comment.id, formData);
        setLikeCount(likeCount + 1);
        reactFlag === "Dislike" && setDisLikeCount(dislikeCount - 1);
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
        await commentReactApi.deleteReactComment(comment.id);
        setDisLikeCount(dislikeCount - 1);
        setReactFlag(null);
      } else {
        const formData = new FormData();
        formData.append("reactFlag", nextReactFlag);
        await commentReactApi.putReactComment(comment.id, formData);
        reactFlag === "Like" && setLikeCount(likeCount - 1);
        setDisLikeCount(dislikeCount + 1);
        setReactFlag(nextReactFlag);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to dislike!");
      }
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
            <Link
              to={`/profile/${comment.user.id}/Uploads`}
              className="card-link"
            >
              <img
                className="avatar"
                src={comment.user.avatarPath || "/img/avatar/default.png"}
                alt="Avatar"
              />
            </Link>
          </div>
          <div className="comment-content">
            <div>
              <Link
                to={`/profile/${comment.user.id}/Uploads`}
                className="card-link"
              >
                <span
                  className={
                    "comment-name" +
                    (!comment.user.deletedAt ? " " : " deleted")
                  }
                >
                  {comment.user.name}
                </span>
              </Link>
              <span
                className="comment-time"
                title={new Date(comment.createdAt).toLocaleString()}
              >
                {calculateTimeDifference(comment.createdAt)}
              </span>
            </div>
            <div className="comment-message">{comment.content}</div>
            <div className="comment-footer">
              <div className="comment-reacts">
                <div>
                  {likeCount || 0} &nbsp;
                  <button className="btn-base" onClick={handleLikeClick}>
                    {reactFlag === "Like" ? (
                      <i className="fa-solid fa-thumbs-up" />
                    ) : (
                      <i className="fa-regular fa-thumbs-up" />
                    )}
                  </button>
                </div>
                <div>
                  {dislikeCount || 0} &nbsp;
                  <button className="btn-base" onClick={handleDislikeClick}>
                    {reactFlag === "Dislike" ? (
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
              {user && user.id === comment.user.id && (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline"
                    className="comment-options-toggle"
                  >
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
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
                        <Modal.Body style={{ wordWrap: "break-word" }}>
                          {comment.content}
                          <div className="end-button">
                            <Button
                              variant="danger"
                              onClick={handleDeleteComment}
                            >
                              Confirm Delete
                            </Button>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </>
                  </Dropdown.Menu>
                </Dropdown>
              )}
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
