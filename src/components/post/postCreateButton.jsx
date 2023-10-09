import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function PostCreateButton({ type, open }) {
  const { user } = useContext(UserContext);
  return (
    <div className="post-form">
      <div>
        <img
          className="avatar"
          src={user?.avatarPath || "/img/avatar/default.png"}
          alt="Avatar"
        />
      </div>
      <button onClick={open}>
        {type === "user" ? (
          <span>What's on your mind, {user?.name}?</span>
        ) : (
          <span>Write somethings, {user?.name}?</span>
        )}
      </button>
    </div>
  );
}
