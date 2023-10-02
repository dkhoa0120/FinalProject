import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { ToastContainer } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as postApi from "../../../service/api.post";
import CreatePostModal from "./CreatePostModal";
import Post from "../../../components/post";
import PostForm from "../../../components/post/postForm";

export default function Community() {
  const { user } = useContext(UserContext);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState(null);
  const { userId } = useParams();

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
      <PostForm
        user={user}
        userId={userId}
        open={() => setShowCreatePost(true)}
      />
      {posts ? (
        posts.map((post, index) => <Post index={index} post={post} />)
      ) : (
        <p></p>
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        user={user}
        show={showCreatePost}
        onHide={() => setShowCreatePost(false)}
        onPostCreated={onPostCreated}
      />
    </>
  );
}
