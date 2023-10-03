import CommentSection from "../commentSection";
import PostOptions from "./postOptions";

export default function PostContent({
  reactFlag,
  post,
  handleDislike,
  handleLike,
  likeCount,
  dislikeCount,
}) {
  return (
    <>
      <p style={{ marginBottom: "5px" }}>{post?.content}</p>
      <div style={{ marginBottom: "10px" }}>
        {likeCount}
        <button className="post-react-button" onClick={handleLike}>
          {reactFlag === "Like" ? (
            <i className="fa-solid fa-thumbs-up" />
          ) : (
            <i className="fa-regular fa-thumbs-up" />
          )}
        </button>
        {dislikeCount}
        <button className="post-react-button" onClick={handleDislike}>
          {reactFlag === "Dislike" ? (
            <i className="fa-solid fa-thumbs-down" />
          ) : (
            <i className="fa-regular fa-thumbs-down" />
          )}
        </button>
        <PostOptions />
      </div>
      <div className="comment-post">
        <CommentSection type="post" typeId={post?.id} />
      </div>
    </>
  );
}
