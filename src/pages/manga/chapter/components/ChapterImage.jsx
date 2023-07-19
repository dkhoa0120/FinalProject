import React from "react";
import ChapterButton from "./ChapterButton";

export default function ChapterImage() {
  return (
    <>
      <div className="general-container">
        <img className="chapter-image" src="/img/banner/banner.png" alt="" />
        <br />
        <img className="chapter-image" src="/img/banner/banner.png" alt="" />
        <br />
        <img className="chapter-image" src="/img/banner/banner.png" alt="" />
        <br />
        <ChapterButton />
      </div>
    </>
  );
}
