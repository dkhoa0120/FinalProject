import React from "react";
import "./styles.css";
import CommentSection from "../../../components/commentSection";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getChapter } from "../../../service/api.chapter";
import { useEffect } from "react";
import ChapterNav from "./components/ChapterNav";

export default function ChapterPage() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);

  const getChapterDetail = async (id) => {
    try {
      const result = await getChapter(id);
      setChapter(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setChapter(null);
      }
    }
  };

  useEffect(() => {
    getChapterDetail(chapterId);
  }, [chapterId]);

  if (!chapter) {
    return <div>Loading...</div>;
  }

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
        <ChapterNav chapter={chapter} />
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
      <CommentSection />
    </>
  );
}
