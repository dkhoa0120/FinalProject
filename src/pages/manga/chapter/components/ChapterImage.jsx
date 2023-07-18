import React from "react";
import ChapterButton from "./ChapterButton";

export default function ChapterImage() {
  return (
    <>
      <div className="general-container">
        <img className="center" src="/img/banner/banner.png" alt="" />
        <br />
        <img className="center" src="/img/banner/banner.png" alt="" />
        <br />
        <img className="center" src="/img/banner/banner.png" alt="" />
        <br />
        <ChapterButton />
      </div>
    </>
  );
}
