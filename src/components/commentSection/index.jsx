import { useEffect, useRef, useState } from "react";
import Comment from "./comment";
import { AddCommentForm } from "./commentForm";
import * as commentApi from "../../service/api.comment";
import { SpinnerLoading } from "../../utilities/spinnerLoading";

export default function CommentSection({ type, typeId }) {
  const [comments, setComments] = useState(null);
  const [loadingComment, setLoadingComment] = useState(false);
  const [outOfComment, setOutOfComment] = useState(false);
  const commentHeader = useRef(null);

  useEffect(() => {
    fetchComments(type, typeId);
  }, [type, typeId]);

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

      // Set outOfComment to disable loading more comment in scroll event below
      if (newComments.data.length > 0) {
        setOutOfComment(false);
      } else {
        setOutOfComment(true);
      }
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  useEffect(() => {
    const commentPost = commentHeader.current.parentNode;

    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = commentPost;
      // Check if you've scrolled to the bottom
      if (
        scrollHeight - scrollTop - clientHeight <= 5 &&
        comments.length > 0 &&
        !outOfComment
      ) {
        setLoadingComment(true);
        setTimeout(() => {
          handleSeeMoreComment(type, typeId, comments[comments.length - 1]);
          setLoadingComment(false);
        }, 1000);
      }
    };
    commentPost.addEventListener("scroll", handleScroll);

    return () => {
      commentPost.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  return (
    <>
      <div id="comment-section-header" ref={commentHeader}>
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

      {/* Loading comment spinner */}
      {loadingComment && <SpinnerLoading />}
    </>
  );
}
