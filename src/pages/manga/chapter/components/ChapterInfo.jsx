import React from "react";

import ChapterButton from "./ChapterButton";

export default function ChapterInfo() {
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
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>
          Sau Khi Có Được Năng Lực Bá Đạo Ở Dị Giới, Tôi Cũng Vô Đối Ở Thế Giới
          Thực: Thăng Cấp Xong Thì Cuộc Đời Cũng Thay Đổi
        </div>
        <ChapterButton />
      </div>
      <br />
    </>
  );
}
