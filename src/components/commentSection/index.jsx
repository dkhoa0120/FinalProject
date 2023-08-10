import { useEffect, useState } from "react";
import PaginationNoParams from "../paginationNoParams";
import Comment from "./comment";
import { AddCommentForm } from "./commentForm";
import { deleteComment, getComments } from "../../service/api.comment";

export default function CommentSection({ type, typeId }) {
  const [comments, setComments] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchComments(type, typeId, page);
  }, [type, typeId, page]);

  const fetchComments = async (type, typeId, page) => {
    const result = await getComments(type, typeId, { page });
    setComments(result.data.itemList);
    setTotalPages(result.data.totalPages);
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
    await deleteComment(commentId);
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const handleChangeComment = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <div className="general-container">
      <div
        className="general-container-title"
        style={{ textDecorationLine: "underline", marginBottom: "0" }}
      >
        Comments
      </div>
      <div id="comment-section">
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

        <div className="d-flex justify-content-center">
          <PaginationNoParams
            page={page}
            totalPages={totalPages}
            onPageChange={handleChangeComment}
          />
        </div>
      </div>
    </div>
  );
}
