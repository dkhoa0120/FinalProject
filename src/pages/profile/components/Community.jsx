import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as postApi from "../../../service/api.post";
import Post from "../../../components/post";
import CreatePostModal from "../../../components/post/CreatePostModal";
import PostCreateButton from "../../../components/post/postCreateButton";
import { UserContext } from "../../../context/UserContext";

export default function Community() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState(null);
  const { userId } = useParams();
  const { user } = useContext(UserContext);

  const onPostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

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
      {posts ? (
        posts.map((post, index) => <Post index={index} post={post} />)
      ) : (
        <p></p>
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
