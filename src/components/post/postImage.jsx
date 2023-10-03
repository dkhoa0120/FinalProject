import { useState } from "react";

export default function PostImage({ post }) {
  const [postImageIndex, setPostImageIndex] = useState(0);
  return (
    <>
      {post?.imageUrls && post.imageUrls.length > 0 && (
        <>
          <div className="modal-community-image">
            {postImageIndex > 0 && (
              <div
                className="arrow-left"
                onClick={() => setPostImageIndex(postImageIndex - 1)}
              >
                <i className="fa-solid fa-angle-left" />
              </div>
            )}
            <img src={post.imageUrls[postImageIndex] || <p></p>} alt="Post" />
            {postImageIndex < post.imageUrls.length - 1 && (
              <div
                className="arrow-right"
                onClick={() => setPostImageIndex(postImageIndex + 1)}
              >
                <i className="fa-solid fa-angle-right" />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
