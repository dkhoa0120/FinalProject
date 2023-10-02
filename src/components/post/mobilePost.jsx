import { Col } from "react-bootstrap";

export default function MobilePost({ post, close }) {
  const calculateTimeDifference = (createdAt) => {
    const currentDate = new Date();
    const chapterDate = new Date(createdAt);
    const timeDifference = Math.abs(currentDate - chapterDate);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference < 50) {
      return `${minutesDifference} minutes ago`;
    } else if (minutesDifference < 1440) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} hours ago`;
    } else {
      const daysDifference = Math.floor(minutesDifference / 1440);
      return `${daysDifference} days ago`;
    }
  };
  return (
    <Col md={6}>
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
      {post?.imageUrls && post.imageUrls.length > 0 && (
        <>
          <div className="modal-community-image">
            <div className="arrow-left">
              <i className="fa-solid fa-angle-left" />
            </div>
            <img src={post.imageUrls[0] || <p></p>} alt="Post" />
            <div className="arrow-right">
              <i className="fa-solid fa-angle-right" />
            </div>
          </div>
        </>
      )}
    </Col>
  );
}
