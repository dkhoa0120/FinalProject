import { Card } from "react-bootstrap";
import CommentForm from "./commentForm";
import CommentList from "./commentList";

export default function CommentSection({ comments }) {
  return (
    <div className="general-container">
      <div
        className="general-container-title"
        style={{ textDecorationLine: "underline", marginBottom: "0" }}
      >
        Comments
      </div>
      <div className="comment-section">
        <Card style={{ padding: "20px" }}>
          <CommentForm />
        </Card>
        <br></br>
        <Card style={{ padding: "20px" }}>
          <CommentList comments={comments} />
        </Card>
      </div>
    </div>
  );
}
