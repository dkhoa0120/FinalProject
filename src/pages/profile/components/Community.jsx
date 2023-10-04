import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as postApi from "../../../service/api.post";
import PostCreateButton from "../../../components/post/postCreateButton";
import { UserContext } from "../../../context/UserContext";
import CreatePostModal from "./CreatePostModal";
import PcPost from "../../../components/post/pcPost";
import PcModal from "../../../components/post/pcModal";
import MobilePost from "../../../components/post/mobilePost";
import MobileModal from "../../../components/post/mobileModal";

export default function Community() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState(null);
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(false);
  const [targetedPostId] = useState(null);
  const [targetPost, setTargetPost] = useState(null);

  const onPostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the handler initially

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUserPosts = async (userId) => {
      const res = await postApi.getPosts(userId);
      setPosts(res.data);
    };
    fetchUserPosts(userId);
  }, [userId]);

  return (
    <>
      <ToastContainer />
      {user && user?.id === userId && (
        <PostCreateButton open={() => setShowCreatePost(true)} />
      )}
      {posts &&
        posts.length > 0 &&
        posts.map((post) =>
          isMobile ? (
            <MobilePost post={post} open={() => setTargetPost(post)} />
          ) : (
            <PcPost post={post} open={() => setTargetPost(post)} />
          )
        )}

      {targetedPostId && isMobile ? (
        <MobileModal
          targetPost={targetPost}
          close={() => setTargetPost(null)}
          post={targetPost}
        />
      ) : (
        <PcModal
          targetPost={targetPost}
          close={() => setTargetPost(null)}
          post={targetPost}
        />
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        show={showCreatePost}
        onHide={() => setShowCreatePost(false)}
        onPostCreated={onPostCreated}
      />
    </>
  );
}
