import React from "react";
import "./styles.css";
import CommentSection from "../../../components/commentSection";
import ChapterInfo from "./components/ChapterInfo";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getChapterPages } from "../../../service/api.chapter";
import { useEffect } from "react";

export default function ChapterPage() {
  const { chapterId } = useParams();
  const [chapterPage, setChapterPage] = useState(null);

  const getChapterDetail = async (id) => {
    try {
      const result = await getChapterPages(id);
      console.log("result", result.data);
      setChapterPage(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setChapterPage(null);
      }
    }
  };

  useEffect(() => {
    getChapterDetail(chapterId);
  }, [chapterId]);

  console.log("chapter", chapterPage);
  if (!chapterPage) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ChapterInfo chapter={chapterPage} />
      <CommentSection />
    </>
  );
}
