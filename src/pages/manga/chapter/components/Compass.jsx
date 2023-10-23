import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as followApi from "../../../../service/api.follow";
import { toast } from "react-toastify";

export default function Compass({ chapter, relatedChapters }) {
  const navigate = useNavigate();
  const [follow, setFollow] = useState(null);
  const mangaId = chapter.manga.id;
  const type = "manga";

  useEffect(() => {
    const fetchUserFollow = async (id) => {
      try {
        const response = await followApi.getCurrentUserFollow(type, id);
        setFollow(response.data);
      } catch (error) {
        console.error("Error retrieving user rating:", error);
      }
    };
    fetchUserFollow(mangaId);
  }, [mangaId]);

  const handleFollow = async () => {
    try {
      if (!follow) {
        await followApi.postFollow(type, mangaId);
        setFollow(true);
      } else {
        await followApi.deleteFollow(type, mangaId);
        setFollow(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to follow!");
      } else {
        console.error(error);
      }
    }
  };

  function handleClick() {
    navigate(`/mangas/${mangaId}`);
  }

  const navigateToPrevChapter = () => {
    const earlierChapters = relatedChapters.filter(
      (c) => c.number < chapter.number
    );
    let prevChapter = earlierChapters[0];
    prevChapter =
      earlierChapters.find(
        (c) =>
          c.uploadingGroup.id === chapter.uploadingGroup.id &&
          c.number === prevChapter.number
      ) || prevChapter;

    // in case there is a gap between chapters
    let confirmNavigate = true;
    if (Math.floor(chapter.number) - Math.floor(prevChapter.number) > 1) {
      confirmNavigate = window.confirm(
        `There is a gap between chapters: ${chapter.number} -> ${prevChapter.number}. Do you want to jump anyway?`
      );
    }
    if (confirmNavigate) {
      navigateToChapter(prevChapter.id);
    }
  };

  const navigateToNextChapter = () => {
    const laterChapters = relatedChapters.filter(
      (c) => c.number > chapter.number
    );
    let nextChapter = laterChapters[laterChapters.length - 1];
    nextChapter =
      laterChapters.findLast(
        (c) =>
          c.uploadingGroup.id === chapter.uploadingGroup.id &&
          c.number === nextChapter.number
      ) || nextChapter;

    // in case there is a gap between chapters
    let confirmNavigate = true;
    if (Math.floor(nextChapter.number) - Math.floor(chapter.number) > 1) {
      confirmNavigate = window.confirm(
        `There is a gap between chapters: ${chapter?.number} -> ${nextChapter?.number}. Do you want to jump anyway?`
      );
    }
    if (confirmNavigate) {
      navigateToChapter(nextChapter.id);
    }
  };
  const navigateToChapter = (chapterId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/chapters/${chapterId}`);
  };

  const isPrevDisable =
    relatedChapters &&
    relatedChapters[relatedChapters.length - 1].number === chapter.number;
  const isNextDisable =
    relatedChapters && relatedChapters[0].number === chapter.number;

  return (
    <div className="chapter-nav">
      <button className="circle-button" onClick={handleClick}>
        <i className="fa-solid fa-list-ul"></i>
      </button>
      <button
        className={"circle-button" + (isPrevDisable ? " disabled" : "")}
        onClick={navigateToPrevChapter}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <Dropdown drop="start">
        <Dropdown.Toggle className="circle-button">
          {chapter.number}
        </Dropdown.Toggle>
        <Dropdown.Menu className="chapter-dropdown">
          {relatedChapters &&
            relatedChapters
              .filter((c) => c.uploadingGroup.id === chapter.uploadingGroup.id)
              .map((c) => (
                <Dropdown.Item
                  as="span"
                  key={c.id}
                  className={
                    "card-link dropdown-item" +
                    (c.number === chapter.number ? " selected" : "")
                  }
                  onClick={() => navigateToChapter(c.id)}
                >
                  Chapter {c.number}
                </Dropdown.Item>
              ))}
        </Dropdown.Menu>
      </Dropdown>
      <button
        className={"circle-button" + (isNextDisable ? " disabled" : "")}
        onClick={navigateToNextChapter}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
      <Dropdown drop="start">
        <Dropdown.Toggle className="circle-button">
          <i className="fa-solid fa-user-group" style={{ color: "white" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="chapter-dropdown">
          {relatedChapters &&
            relatedChapters
              .filter((c) => c.number === chapter.number)
              .map((c) => (
                <span
                  key={c.id}
                  className={
                    "card-link dropdown-item" +
                    (c.uploadingGroup.id === chapter.uploadingGroup.id
                      ? " selected"
                      : "")
                  }
                  onClick={() => navigateToChapter(c.id)}
                >
                  {c.uploadingGroup.name}
                </span>
              ))}
        </Dropdown.Menu>
      </Dropdown>
      <button className="circle-button" onClick={handleFollow}>
        {!follow && <i className="fa-regular fa-heart"></i>}
        {follow && (
          <i className="fa-solid fa-heart" style={{ color: "#f60056" }}></i>
        )}
      </button>
      <button className="circle-button">
        <i className="fa-regular fa-flag"></i>
      </button>
    </div>
  );
}
