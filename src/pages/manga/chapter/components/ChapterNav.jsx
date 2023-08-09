import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getRelatedChapters } from "../../../../service/api.chapter";
import { useEffect } from "react";

export default function ChapterNav({ chapter }) {
  const [chapterList, setChapterList] = useState(null);
  const navigate = useNavigate();

  const getChapterList = async (id) => {
    try {
      const result = await getRelatedChapters(id);
      setChapterList(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setChapterList(null);
      }
    }
  };

  function handleClick() {
    navigate(`/Manga/${chapter.manga.id}`);
  }

  const findChapter = (number, groupId) => {
    const foundChapters = chapterList.filter((c) => c.number === number);
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
      const earlierChapters = chapterList.filter((c) => c.number < prevNumber);
      prevChapter =
        earlierChapters.find((c) => c.groupId === chapter.groupId) ||
        earlierChapters[0];
      confirmNavigate = window.confirm(
        `There is a gap between chapters: ${chapter.number} -> ${prevChapter.number}. Do you want to jump anyway?`
      );
    }

    if (confirmNavigate) {
      navigate(`/Chapter/${prevChapter.id}`);
    }
  };
  const navigateToNextChapter = () => {
    const nextNumber = chapter.number + 1;
    let nextChapter = findChapter(nextNumber);
    let confirmNavigate = true;

    // in case there is a gap between chapters
    if (!nextChapter) {
      const earlierChapters = chapterList.filter((c) => c.number > nextChapter);
      nextChapter =
        earlierChapters.findLast((c) => c.groupId === chapter.groupId) ||
        earlierChapters[earlierChapters.length - 1];
      confirmNavigate = window.confirm(
        `There is a gap between chapters: ${chapter.number} -> ${nextChapter.number}. Do you want to jump anyway?`
      );
    }

    if (confirmNavigate) {
      navigate(`/Chapter/${nextChapter.id}`);
    }
  };

  const isPrevDisable = () => {
    if (!chapterList) return false;
    const firstChapterNumber = chapterList[chapterList.length - 1].number;
    return firstChapterNumber === chapter.number;
  };
  const isNextDisable = () => {
    if (!chapterList) return false;
    const lastChapterNumber = chapterList[0].number;
    return lastChapterNumber === chapter.number;
  };

  useEffect(() => {
    getChapterList(chapter.id);
  }, [chapter.id]);

  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "10px" }}
      >
        <button className="button-50" onClick={handleClick}>
          <i className="fa-solid fa-list-ul"></i>
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className="button-50"
          onClick={navigateToPrevChapter}
          disabled={isPrevDisable()}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        &nbsp;&nbsp;
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            <span className="dropdown-text">Chapter {chapter.number}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ minWidth: "auto" }}>
            {chapterList &&
              chapterList.map((c) => (
                <Link
                  key={c.id}
                  to={`/Chapter/${c.id}`}
                  className="card-link dropdown-item"
                >
                  Chapter {c.number}{" "}
                </Link>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        &nbsp;&nbsp;
        <button
          className="button-50"
          onClick={navigateToNextChapter}
          disabled={isNextDisable()}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className="button-50">
          <i className="fa-regular fa-heart"></i>
        </button>
        <button className="button-50">
          <i className="fa-regular fa-flag"></i>
        </button>
      </div>
    </>
  );
}
