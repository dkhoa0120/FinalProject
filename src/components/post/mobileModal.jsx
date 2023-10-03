import PostImage from "./postImage";
import PostContent from "./postContent";

export default function MobileModal({
  post,
  close,
  DropDownOptions,
  calculateTimeDifference,
}) {
  return (
    <>
      <div className="modal-users-info-mobile-view">
        <div>
          <img
            className="avatar"
            src={post?.user.avatarPath || "/img/avatar/default.png"}
            alt="Avatar"
          />
          <span className="comment-name">{post?.user.name}</span>
          <span className="comment-time">
            {calculateTimeDifference(post?.createdAt)}
          </span>
        </div>
        <span className="close-com" onClick={close}>
          <i className="fa-solid fa-xmark"></i>
        </span>
      </div>
      <PostImage post={post} />
      <PostContent post={post} DropDownOptions={DropDownOptions} />
    </>
  );
}
