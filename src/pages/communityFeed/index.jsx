import { useState } from "react";
import PostCreateButton from "../../components/post/postCreateButton";
import * as postApi from "../../service/api.post";
import { useEffect } from "react";
import {} from "react-toastify";
import CreatePostModal from "../../components/post/CreatePostModal";
import MobilePost from "../../components/post/mobilePost";
import PcPost from "../../components/post/pcPost";
import MobileModal from "../../components/post/mobileModal";
import PcModal from "../../components/post/pcModal";
import { useNavigate } from "react-router-dom";
import { SpinnerLoading } from "../../utilities/spinnerLoading";

export default function CommunityFeeds() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [targetedPostId, setTargetedPostId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [outOfPost, setOutOfPost] = useState(false);
  const type = "user";
  const targetPost = targetedPostId
    ? posts.find((post) => post.id === targetedPostId)
    : null;
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Community - 3K Manga";
  }, []);
  const fetchPosts = async () => {
    try {
      const res = await postApi.getMyFeeds();
      setPosts(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleCreatePost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

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

  const latestPost = posts.reduce((latest, current) => {
    return new Date(current.createdAt) < new Date(latest.createdAt)
      ? current
      : latest;
  }, posts[0]);

  const updateDeletePost = (postId) => {
    setPosts(posts.filter((comment) => comment.id !== postId));
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
    document.title = "Community Feeds - 3K Manga";
  }, []);
  useEffect(() => {
    fetchPosts();
  }, []);
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

  const handleSeeMorePost = async (createdAtCursor) => {
    try {
      const newPosts = await postApi.getMyFeeds({
        createdAtCursor,
      });
      setPosts([...posts, ...newPosts.data]);

      // Set outOfComment to disable loading more comment in scroll event below
      if (newPosts.data.length > 0) {
        setOutOfPost(false);
      } else {
        setOutOfPost(true);
      }
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if you've scrolled to the bottom
      if (
        window.innerHeight + Math.round(window.scrollY) >=
          document.body.offsetHeight &&
        posts.length > 0 &&
        !outOfPost
      ) {
        setLoadingPost(true);
        setTimeout(() => {
          handleSeeMorePost(latestPost?.createdAt);
          setLoadingPost(false);
        }, 1000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  return (
    <div className="general-container">
      <PostCreateButton open={() => setShowCreatePost(true)} type={type} />

      <CreatePostModal
        show={showCreatePost}
        onHide={() => setShowCreatePost(false)}
        onPostCreated={handleCreatePost}
        type={type}
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

      {loadingPost && <SpinnerLoading />}
    </div>
  );
}
