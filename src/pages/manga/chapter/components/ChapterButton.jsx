import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getRelatedChapterPages } from "../../../../service/api.chapter";
import { useEffect } from "react";

export default function ChapterButton({ chapter }) {
  const [chapterList, setChapterList] = useState(null);
  const navigate = useNavigate();

  const getChapterList = async (id) => {
    try {
      const result = await getRelatedChapterPages(id);
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

  const findChapterByNumber = (number) => {
    return chapterList.find((chapter) => chapter.number === number);
  };
  const navigateToPrevChapter = () => {
    const prevChapterNumber = chapter.number - 1;
    const prevChapter = findChapterByNumber(prevChapterNumber);

    if (prevChapter) {
      navigate(`/Chapter/${prevChapter.id}`);
    }
  };
  const navigateToNextChapter = () => {
    const nextChapterNumber = chapter.number + 1;
    const nextChapter = findChapterByNumber(nextChapterNumber);

    if (nextChapter) {
      navigate(`/Chapter/${nextChapter.id}`);
    }
  };

  console.log("chapter List", chapterList);

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
          <i class="fa-solid fa-list-ul"></i>
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button className="button-50" onClick={navigateToPrevChapter}>
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        &nbsp;&nbsp;
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            <span className="dropdown-text">Chapter {chapter.number}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {chapterList &&
              chapterList.map((c) => (
                <Dropdown.Item key={c.id}>
                  {" "}
                  <Link to={`/Chapter/${c.id}`} className="card-link">
                    Chapter {c.number}{" "}
                  </Link>
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        &nbsp;&nbsp;
        <button className="button-50" onClick={navigateToNextChapter}>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className="button-50">
          <i class="fa-regular fa-heart"></i>
        </button>
        <button className="button-50">
          <i class="fa-regular fa-flag"></i>
        </button>
      </div>
    </>
  );
}
