import "./styles.css";
import { calculateTimeDifference } from "../../utilities/dateTimeHelper";
import PostStats from "./postStats";

export default function PcPost({ post, index, open }) {
  return (
    <>
      <div key={index} className="community-container">
        <div className="community-info">
          <div>
            <img
              className="avatar"
              src={post.user.avatarPath || "/img/avatar/default.png"}
              alt="Avatar"
            />
          </div>
          <div>
            <span className="comment-name">{post.user.name} </span>
            <span className="comment-time">
              {calculateTimeDifference(post.createdAt)}
            </span>
            <div className="text-limit-4">{post.content}</div>
            <PostStats post={post} />
          </div>
        </div>
        {post.imageUrls && post.imageUrls.length > 0 && (
          <>
            <div className="post-image-container" onClick={open}>
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
