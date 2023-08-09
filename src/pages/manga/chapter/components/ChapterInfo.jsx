import React from "react";

import ChapterButton from "./ChapterButton";

export default function ChapterInfo({ chapter }) {
  return (
    <>
      <div
        className="general-container"
        style={{
          textAlign: "center",
          width: "700px",
          height: "auto",
          margin: "0 auto",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "25px" }}>
          {chapter.name}
        </div>
        <ChapterButton chapter={chapter} />
      </div>
      <br />
      <div>
        {chapter.pageUrls.map((url, index) => (
          <img
            className="chapter-image"
            key={index}
            src={url}
            alt={`page ${index}`}
          />
        ))}
      </div>
      <br />
    </>
  );
}
