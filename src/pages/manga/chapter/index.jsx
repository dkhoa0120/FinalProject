import "./styles.css";
import CommentSection from "../../../components/commentSection";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getChapter, getRelatedChapters } from "../../../service/api.chapter";
import ChapterNav from "./components/ChapterNav";

export default function ChapterPage() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [relatedChapters, setRelatedChapters] = useState(null);
  const [showChapterNav, setShowChapterNav] = useState(false);

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
      <div className="chapter-header">
        <div style={{ fontWeight: "bold", fontSize: "25px" }}>
          {chapter.name}
        </div>
        <Link className="manga-title" to={`/Manga/${chapter.manga.id}`}>
          {chapter.manga.originalTitle}
        </Link>
      </div>

      <button
        className="circle-button chapter-nav-button"
        onClick={() => setShowChapterNav(!showChapterNav)}
      >
        <i className="fa-regular fa-compass"></i>
      </button>
      {showChapterNav && (
        <ChapterNav chapter={chapter} relatedChapters={relatedChapters} />
      )}

      {chapter.pageUrls.map((url, index) => (
        <img
          className="chapter-image"
          key={index}
          src={url}
          alt={`page ${index}`}
        />
      ))}

      <br />
      <CommentSection type="chapter" typeId={chapterId} />
    </>
  );
}
