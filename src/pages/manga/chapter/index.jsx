import "./styles.css";
import CommentSection from "../../../components/commentSection";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getChapter, getRelatedChapters } from "../../../service/api.chapter";
import ChapterNav from "./components/ChapterNav";

export default function ChapterPage() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [relatedChapters, setRelatedChapters] = useState(null);

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

  const getChapterList = async (id) => {
    try {
      const result = await getRelatedChapters(id);
      setRelatedChapters(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setRelatedChapters(null);
      }
    }
  };

  useEffect(() => {
    getChapterDetail(chapterId);
    getChapterList(chapterId);
  }, [chapterId]);

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="chapter-nav">
        <div style={{ fontWeight: "bold", fontSize: "25px" }}>
          {chapter.name}
        </div>
        <ChapterNav chapter={chapter} relatedChapters={relatedChapters} />
      </div>

      {chapter.pageUrls.map((url, index) => (
        <img
          className="chapter-image"
          key={index}
          src={url}
          alt={`page ${index}`}
        />
      ))}

      <div className="chapter-nav">
        <ChapterNav chapter={chapter} relatedChapters={relatedChapters} />
      </div>
      <CommentSection />
    </>
  );
}
