import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./styles.css";
import MangaBanner from "./components/MangaBanner";
import CommentSection from "../../../components/commentSection";
import ChapterSection from "./components/ChapterSection";
import * as mangaApi from "../../../service/api.manga";
import * as ratingApi from "../../../service/api.rating";
import * as followApi from "../../../service/api.follow";

export default function MangaDetail() {
  const [manga, setManga] = useState(null);
  const [mangaStats, setMangaStats] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [totalChapterPages, setTotalChapterPages] = useState(0);
  const [chapterPage, setChapterPage] = useState(1);
  const { mangaId } = useParams();
  const [rate, setRate] = useState(0);
  const [follow, setFollow] = useState(null);
  const navigate = useNavigate();

  const handleSelectRate = async (eventKey) => {
    const formData = new FormData();
    formData.append("inputRating", eventKey);
    try {
      if (rate === 0) {
        await ratingApi.postRating(mangaId, formData);
        setMangaStats((prev) => ({
          ...prev,
          ratingSum: prev.ratingSum + Number(eventKey),
          ratingCount: prev.ratingCount + 1,
        }));
      } else if (eventKey !== "0") {
        await ratingApi.putRating(mangaId, formData);
        setMangaStats((prev) => ({
          ...prev,
          ratingSum: prev.ratingSum - rate + Number(eventKey),
          ratingCount: prev.ratingCount,
        }));
      } else {
        await ratingApi.deleteRating(mangaId);
        setMangaStats((prev) => ({
          ...prev,
          ratingSum: prev.ratingSum - rate,
          ratingCount: prev.ratingCount - 1,
        }));
      }
      setRate(Number(eventKey));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to rate!");
      } else {
        console.error(error);
      }
    }
  };

  const handleFollow = async () => {
    try {
      if (!follow) {
        await followApi.postFollow(mangaId);
        setFollow(true);
        setMangaStats((prev) => ({
          ...prev,
          followCount: prev.followCount + 1,
        }));
      } else {
        await followApi.deleteFollow(mangaId);
        setFollow(false);
        setMangaStats((prev) => ({
          ...prev,
          followCount: prev.followCount - 1,
        }));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to follow!");
      } else {
        console.error(error);
      }
    }
  };

  const handleChangeChapter = (pageNum) => {
    setChapterPage(pageNum);
  };

  const fetchUserRating = async (mangaId) => {
    try {
      const response = await ratingApi.getCurrentUserRating(mangaId);
      const userRating = response.data;
      if (userRating) {
        setRate(userRating);
      } else {
        setRate(0);
      }
    } catch (error) {
      console.error("Error retrieving user rating:", error);
    }
  };

  const getManga = async (id) => {
    try {
      const mangaDetail = (await mangaApi.getMangaById(id)).data;
      const mangaStats = (await mangaApi.getMangaStats(id)).data;
      setManga(mangaDetail);
      setMangaStats(mangaStats);
      document.title = `${mangaDetail.originalTitle} - 3K Manga`;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate("/404");
      }
    }
  };

  const getChaptersByPage = async (id, page) => {
    try {
      const result = await mangaApi.getChapterByMangaId(id, { page });
      const groupedChapters = result.data.itemList.reduce((result, chapter) => {
        const { number } = chapter;
        if (!result[number]) {
          result[number] = [];
        }
        result[number].push(chapter);
        return result;
      }, {});
      setChapters(groupedChapters);
      setTotalChapterPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setChapters(null);
      }
    }
  };

  const fetchUserFollow = async (mangaId) => {
    try {
      const response = await followApi.getCurrentUserFollow(mangaId);
      setFollow(response.data);
    } catch (error) {
      console.error("Error retrieving user rating:", error);
    }
  };

  useEffect(() => {
    getManga(mangaId);
    fetchUserRating(mangaId);
    getChaptersByPage(mangaId, chapterPage);
    fetchUserFollow(mangaId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mangaId, chapterPage]);

  return (
    <>
      <ToastContainer />
      <MangaBanner
        manga={manga}
        mangaStats={mangaStats}
        rate={rate}
        handleSelectRate={handleSelectRate}
        follow={follow}
        handleFollow={handleFollow}
      />
      <ChapterSection
        chapters={chapters}
        page={chapterPage}
        totalPages={totalChapterPages}
        onPageChange={handleChangeChapter}
      />
      <div className="general-container">
        <div
          className="general-container-title"
          style={{ textDecorationLine: "underline", marginBottom: "0" }}
        >
          Comments
        </div>
        <div id="comment-section">
          <CommentSection type="manga" typeId={mangaId} />
        </div>
      </div>
    </>
  );
}
