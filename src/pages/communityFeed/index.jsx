import { useContext } from "react";
import PostCreateButton from "../../components/post/postCreateButton";
import { UserContext } from "../../context/UserContext";

export default function CommunityFeeds() {
  const { user } = useContext(UserContext);
  return (
    <div div className="general-container">
      <PostCreateButton />
      <div className="community-container">
        <div className="community-info">
          <div>
            <img className="avatar" src={user?.avatarPath} alt="Avatar" />
          </div>
          <div>
            <span className="comment-name">{user?.name} </span>
            <span className="comment-time">
              {/* {calculateTimeDifference(post.createdAt)} */}
            </span>
            <div className="text-limit-4" style={{ wordBreak: "break-word" }}>
              Test123
            </div>
          </div>
        </div>
        <div className="post-image-container">
          <div className="post-image-quantity">+ 1</div>
          <img src={"/img/banner/groupBanner.png"} alt="Post" />
        </div>
      </div>
      <div className="community-container">
        <div className="community-info">
          <div>
            <img className="avatar" src={user?.avatarPath} alt="Avatar" />
          </div>
          <div>
            <span className="comment-name">{user?.name} </span>
            <span className="comment-time">
              {/* {calculateTimeDifference(post.createdAt)} */}
            </span>
            <div className="text-limit-4" style={{ wordBreak: "break-word" }}>
              Test123
            </div>
          </div>
        </div>
        <div className="post-image-container">
          <div className="post-image-quantity">+ 1</div>
          <img src={"/img/error/coverNotFound.png"} alt="Post" />
        </div>
      </div>
    </div>
  );
}
