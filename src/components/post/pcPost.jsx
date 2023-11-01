import "./styles.css";
import { calculateTimeDifference } from "../../utilities/dateTimeHelper";
import PostStats from "./postStats";

export default function PcPost({
  post,
  open,
  react,
  updatePostEdited,
  updateDeletePost,
}) {
  return (
    <>
      <div key={post.id} className="community-container" onClick={open}>
        <div className="community-info">
          <div>
            <img
              className="avatar"
              src={post.user.avatarPath || "/img/avatar/default.png"}
              alt="Avatar"
            />
          </div>
          <div>
            <span
              className={
                "comment-name" + (!post.user.deletedAt ? " " : " deleted")
              }
            >
              {post.user.name}{" "}
              {post.group && (
                <>
                  <i className="fa-solid fa-arrow-right"></i> {post.group.name}
                </>
              )}
            </span>

            <span className="comment-time">
              {calculateTimeDifference(post.createdAt)}
            </span>
            <div className="text-limit-4" style={{ wordBreak: "break-word" }}>
              {post.content}
            </div>
            <PostStats
              post={post}
              react={react}
              updatePostEdited={updatePostEdited}
              updateDeletePost={updateDeletePost}
            />
          </div>
        </div>
        {post.imageUrls && post.imageUrls.length > 0 && (
          <>
            <div className="post-image-container">
              {post.imageUrls.length > 1 ? (
                <div className="post-image-quantity">
                  + {post.imageUrls.length - 1}
                </div>
              ) : null}
              <img src={post.imageUrls[0] || <p></p>} alt="Post" />
            </div>
          </>
        )}
      </div>
    </>
  );
}
