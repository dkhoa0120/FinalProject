import { useEffect, useState } from "react";

import Comment from "./comment";
import { AddCommentForm } from "./commentForm";
import * as commentApi from "../../service/api.comment";
import { Button } from "react-bootstrap";

export default function CommentSection({ type, typeId }) {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetchComments(type, typeId);
  }, [type, typeId]);

  console.log(comments);

  const fetchComments = async (type, typeId) => {
    const result = await commentApi.getComments(type, typeId);
    setComments(result.data);
  };
  const addComment = (comment) => setComments([comment, ...comments]);
  const editComment = (commentId, commentContent) =>
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: commentContent }
          : comment
      )
    );
  const removeComment = async (commentId) => {
    await commentApi.deleteComment(commentId);
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const handleSeeMoreComment = async (type, typeId, lastCreated) => {
    try {
      const newComments = await commentApi.getComments(type, typeId, {
        createdAtCursor: lastCreated?.createdAt,
      });
      setComments([...comments, ...newComments.data]);
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };
  return (
    <>
      <div id="comment-section-header">
        <AddCommentForm
          type={type}
          typeId={typeId}
          addCommentToState={addComment}
        />
      </div>

      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            editComment={editComment}
            removeComment={removeComment}
          />
        ))}

      {comments && (
        <div className="d-flex justify-content-end">
          <Button
            className="btn btn-light"
            onClick={() =>
              handleSeeMoreComment(type, typeId, comments[comments.length - 1])
            }
          >
            See More
          </Button>
        </div>
      )}
    </>
  );
}
