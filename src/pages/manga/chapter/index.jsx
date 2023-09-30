import "./styles.css";
import CommentSection from "../../../components/commentSection";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as chapterApi from "../../../service/api.chapter";
import ChapterNav from "./components/ChapterNav";
import { ToastContainer } from "react-toastify";
import * as viewApi from "../../../service/api.view";
import Compass from "./components/Compass";

export default function ChapterPage() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [relatedChapters, setRelatedChapters] = useState(null);
  const [showChapterNav, setShowChapterNav] = useState(false);

  const getChapterDetail = async (id) => {
    try {
      const result = await chapterApi.getChapter(id);
      const chapter = result.data;
      setChapter(chapter);
      document.title = `Chapter ${chapter.number} | ${chapter.manga.originalTitle} - 3K Manga`;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setChapter(null);
      }
    }
  };

  const getChapterList = async (id) => {
    try {
      const result = await chapterApi.getRelatedChapters(id);
      setRelatedChapters(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setRelatedChapters(null);
      }
    }
  };

  const postViewForChapter = async (id) => {
    try {
      await viewApi.postView("chapter", id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChapterDetail(chapterId);
    getChapterList(chapterId);
    postViewForChapter(chapterId);
  }, [chapterId]);

  if (!chapter) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="chapter-header">
        <div style={{ fontWeight: "bold", fontSize: "25px" }}>
          {chapter.name}
        </div>
        <Link className="manga-title" to={`/mangas/${chapter.manga.id}`}>
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
        <Compass chapter={chapter} relatedChapters={relatedChapters} />
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
      <ChapterNav chapter={chapter} relatedChapters={relatedChapters} />

      <br />
      <div className="general-container">
        <div
          className="general-container-title"
          style={{ textDecorationLine: "underline", marginBottom: "0" }}
        >
          Comments
        </div>
        <div id="comment-section">
          <CommentSection type="chapter" typeId={chapterId} />
        </div>
      </div>
    </>
  );
}
