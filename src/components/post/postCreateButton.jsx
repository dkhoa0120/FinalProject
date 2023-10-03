import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";

export default function PostCreateButton({ open }) {
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  return (
    <>
      {user && user?.id === userId && (
        <div className="post-form">
          <div>
            <img
              className="avatar"
              src={user.avatarPath || "/img/avatar/default.png"}
              alt="Avatar"
            />
          </div>
          <button onClick={open}>
            <span>What's on your mind, {user.name}?</span>
          </button>
        </div>
      )}
    </>
  );
}
