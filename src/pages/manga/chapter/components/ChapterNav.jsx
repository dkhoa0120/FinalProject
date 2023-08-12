import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  deleteFollow,
  getCurrentUserFollow,
  postFollow,
} from "../../../../service/api.follow";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ChapterNav({ chapter, relatedChapters }) {
  const navigate = useNavigate();
  const [follow, setFollow] = useState(null);
  const mangaId = chapter.manga.id;

  useEffect(() => {
    const fetchUserFollow = async (id) => {
      try {
        const response = await getCurrentUserFollow(id);
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
        await postFollow(mangaId);
        setFollow(true);
      } else {
        await deleteFollow(mangaId);
        setFollow(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to follow!", {
          theme: "colored",
        });
      } else {
        console.error(error);
      }
    }
  };

  function handleClick() {
    navigate(`/Manga/${mangaId}`);
  }

  const findChapter = (number, groupId) => {
    const foundChapters = relatedChapters.filter((c) => c.number === number);
    return (
      foundChapters.find((c) => c.groupId === chapter.groupId) ||
      foundChapters[0]
    );
  };
  const navigateToPrevChapter = () => {
    const prevNumber = chapter.number - 1;
    let prevChapter = findChapter(prevNumber);
    let confirmNavigate = true;

    // in case there is a gap between chapters
    if (!prevChapter) {
      const earlierChapters = relatedChapters.filter(
        (c) => c.number < prevNumber
      );
      prevChapter =
        earlierChapters.find((c) => c.groupId === chapter.groupId) ||
        earlierChapters[0];
      confirmNavigate = window.confirm(
        `There is a gap between chapters: ${chapter.number} -> ${prevChapter.number}. Do you want to jump anyway?`
      );
    }

    if (confirmNavigate) {
      navigateToChapter(prevChapter.id);
    }
  };
  const navigateToNextChapter = () => {
    const nextNumber = chapter.number + 1;
    let nextChapter = findChapter(nextNumber);
    let confirmNavigate = true;

    // in case there is a gap between chapters
    if (!nextChapter) {
      const earlierChapters = relatedChapters.filter(
        (c) => c.number > nextChapter
      );
      nextChapter =
        earlierChapters.findLast((c) => c.groupId === chapter.groupId) ||
        earlierChapters[earlierChapters.length - 1];
      confirmNavigate = window.confirm(
        `There is a gap between chapters: ${chapter.number} -> ${nextChapter.number}. Do you want to jump anyway?`
      );
    }

    if (confirmNavigate) {
      navigateToChapter(nextChapter.id);
    }
  };
  const navigateToChapter = (chapterId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/Chapter/${chapterId}`);
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
            relatedChapters.map((c) => (
              <span
                key={c.id}
                className="card-link dropdown-item"
                onClick={() => navigateToChapter(c.id)}
              >
                Chapter {c.number}
              </span>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      <button
        className={"circle-button" + (isNextDisable ? " disabled" : "")}
        onClick={navigateToNextChapter}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>

      <button className="circle-button" onClick={handleFollow}>
        {!follow && <i className="fa-regular fa-heart"></i>}
        {follow && (
          <i className="fa-solid fa-heart" style={{ color: "#eb0f0f" }}></i>
        )}
      </button>
      <button className="circle-button">
        <i className="fa-regular fa-flag"></i>
      </button>
    </div>
  );
}
