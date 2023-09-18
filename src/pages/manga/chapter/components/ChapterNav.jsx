import { Button, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ChapterNav({ chapter, relatedChapters }) {
  const navigate = useNavigate();

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
    <div className="d-flex justify-content-center align-items-center gap-1">
      <Button
        className={isPrevDisable ? " disabled" : ""}
        variant="dark"
        onClick={navigateToPrevChapter}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </Button>

      <Dropdown drop="down-centered" style={{ display: "inline" }}>
        <Dropdown.Toggle variant="dark">
          Chapter {chapter.number}
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
                    "card-link" +
                    (c.number === chapter.number ? " selected" : "")
                  }
                  onClick={() => navigateToChapter(c.id)}
                >
                  Chapter {c.number}
                </Dropdown.Item>
              ))}
        </Dropdown.Menu>
      </Dropdown>

      <Button
        className={isNextDisable ? " disabled" : ""}
        variant="dark"
        onClick={navigateToNextChapter}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </Button>
    </div>
  );
}
