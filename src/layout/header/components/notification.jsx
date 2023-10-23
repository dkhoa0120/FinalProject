export default function Notification() {
  return (
    <>
      <div className="notification-container">
        <div className="d-flex" style={{ padding: "0 10px" }}>
          <img
            className="avatar"
            src="/img/avatar/default.png"
            alt="Avatar"
            style={{ marginRight: "5px" }}
          />
          <div>
            <span style={{ fontWeight: "bold" }}>
              Some of your requests has been approved
            </span>
            <span className="comment-time" style={{ display: "block" }}>
              4 hours ago
            </span>
          </div>
          <i className="fa-solid fa-circle mark-read-icon notification" />
        </div>
      </div>
    </>
  );
}
