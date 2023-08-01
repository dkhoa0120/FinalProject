import CommentForm from "./commentForm";
import CommentList from "./commentList";
import PaginationNoParams from "../paginationNoParams";

export default function CommentSection({
  comments,
  page,
  addComment,
  editComment,
  removeComment,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="general-container">
      <div
        className="general-container-title"
        style={{ textDecorationLine: "underline", marginBottom: "0" }}
      >
        Comments
      </div>
      <div className="comment-section">
        <CommentForm handleComment={addComment} />
        <br />
        <CommentList
          comments={comments}
          editComment={editComment}
          removeComment={removeComment}
        />
        <div className="d-flex justify-content-center">
          <PaginationNoParams
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
