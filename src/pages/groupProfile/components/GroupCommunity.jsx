import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as postApi from "../../../service/api.post";
import PostCreateButton from "../../../components/post/postCreateButton";
import { UserContext } from "../../../context/UserContext";
import PcPost from "../../../components/post/pcPost";
import PcModal from "../../../components/post/pcModal";
import MobilePost from "../../../components/post/mobilePost";
import MobileModal from "../../../components/post/mobileModal";
import { ToastContainer } from "react-toastify";
import CreatePostModal from "../../../components/post/CreatePostModal";

export default function GroupCommunity({ isUserAMember, isOwner, isMod }) {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);
  const { groupId } = useParams();
  const { user } = useContext(UserContext);
  const memberId = user?.id;
  const [isMobile, setIsMobile] = useState(false);
  const [targetedPostId, setTargetedPostId] = useState(null);
  const targetPost = targetedPostId
    ? posts.find((post) => post.id === targetedPostId)
    : null;

  const handleCreatePost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  console.log("isOwner", isOwner);
  const updatePostEdited = (updatedPost) => {
    setPosts(
      posts.map((post) =>
        post.id === updatedPost.id
          ? {
              ...post,
              content: updatedPost.content,
              imageUrls: updatedPost.imageUrls,
            }
          : post
      )
    );
  };

  const updateDeletePost = (postId) => {
    setPosts(posts.filter((comment) => comment.id !== postId));
  };

  const handleSeeMorePost = async (userId, createdAtCursor) => {
    try {
      const newPosts = await postApi.getPosts(userId, {
        createdAtCursor: createdAtCursor?.createdAt,
      });
      setPosts([...posts, ...newPosts.data]);
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  const handleReactPost = (postId, selectedReact) => {
    const nextPosts = [...posts];
    const post = nextPosts.find((post) => post.id === postId);
    const prevReactFlag = post.userReactFlag;

    if (selectedReact === "Like") {
      if (prevReactFlag === "Like") {
        post.likeCount--;
        post.userReactFlag = "None";
      } else if (prevReactFlag === "Dislike") {
        post.likeCount++;
        post.dislikeCount--;
        post.userReactFlag = "Like";
      } else {
        post.likeCount++;
        post.userReactFlag = "Like";
      }
    } else {
      if (prevReactFlag === "Like") {
        post.likeCount--;
        post.dislikeCount++;
        post.userReactFlag = "Dislike";
      } else if (prevReactFlag === "Dislike") {
        post.dislikeCount--;
        post.userReactFlag = "None";
      } else {
        post.dislikeCount++;
        post.userReactFlag = "Dislike";
      }
    }

    setPosts(nextPosts);
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
    const fetchGroupPosts = async (groupId) => {
      const res = await postApi.getGroupPosts(groupId);
      setPosts(res.data);
    };
    fetchGroupPosts(groupId);
  }, [groupId]);

  return (
    <>
      {isUserAMember | isOwner | isMod ? (
        <PostCreateButton open={() => setShowCreatePost(true)} type={"group"} />
      ) : (
        <p></p>
      )}

      <CreatePostModal
        show={showCreatePost}
        onHide={() => setShowCreatePost(false)}
        onPostCreated={handleCreatePost}
        type="group"
        typeId={groupId}
      />

      {posts &&
        posts.length > 0 &&
        posts.map((post) =>
          isMobile ? (
            <MobilePost
              key={post.id}
              post={post}
              open={() => setTargetedPostId(post.id)}
              react={handleReactPost}
              updatePostEdited={updatePostEdited}
              updateDeletePost={updateDeletePost}
            />
          ) : (
            <PcPost
              key={post.id}
              post={post}
              open={() => setTargetedPostId(post.id)}
              react={handleReactPost}
              handleSeeMorePost={handleSeeMorePost}
              updatePostEdited={updatePostEdited}
              updateDeletePost={updateDeletePost}
            />
          )
        )}

      {targetedPostId &&
        (isMobile ? (
          <MobileModal
            post={targetPost}
            close={() => setTargetedPostId(null)}
            react={handleReactPost}
            updatePostEdited={updatePostEdited}
            updateDeletePost={updateDeletePost}
          />
        ) : (
          <PcModal
            post={targetPost}
            close={() => setTargetedPostId(null)}
            react={handleReactPost}
            updatePostEdited={updatePostEdited}
            updateDeletePost={updateDeletePost}
          />
        ))}
    </>
  );
}
