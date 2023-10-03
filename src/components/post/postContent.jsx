import CommentSection from "../commentSection";

export default function PostContent({ post, DropDownOptions }) {
  return (
    <>
      <p style={{ marginBottom: "5px" }}>{post?.content}</p>
      <div style={{ marginBottom: "10px" }}>
        {post?.likeCount}
        <button className="post-react-button">
          <i className="fa-regular fa-thumbs-up" />
        </button>
        {post?.dislikeCount}
        <button className="post-react-button">
          <i className="fa-regular fa-thumbs-down" />
        </button>
        <DropDownOptions />
      </div>
      <div className="comment-post">
        <CommentSection type="post" typeId={post?.id} />
      </div>
    </>
  );
}
