import { Card } from "react-bootstrap";
import CommentForm from "./commentForm";
import CommentList from "./commentList";

export default function CommentSection() {
  return (
    <div className="General-Container">
      <div
        className="General-Container-title"
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
          <CommentList />
        </Card>
      </div>
    </div>
  );
}
