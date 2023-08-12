import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./styles.css";
import MangaBanner from "./components/MangaBanner";
import CommentSection from "../../../components/commentSection";
import ChapterSection from "./components/ChapterSection";
import {
  getChapterByMangaIdForUser,
  getMangaByIdForUser,
} from "../../../service/api.manga";
import {
  deleteRating,
  getCurrentUserRating,
  postRating,
  putRating,
} from "../../../service/api.rating";
import {
  deleteFollow,
  getCurrentUserFollow,
  postFollow,
} from "../../../service/api.follow";

export default function MangaDetail() {
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [totalChapterPages, setTotalChapterPages] = useState(0);
  const [chapterPage, setChapterPage] = useState(1);
  const { mangaId } = useParams();
  const [rate, setRate] = useState(false);
  const [follow, setFollow] = useState(null);

  const handleSelectRate = async (eventKey) => {
    const formData = new FormData();
    formData.append("inputRating", eventKey);
    try {
      if (!rate) {
        await postRating(mangaId, formData);
      } else {
        await putRating(mangaId, formData);
      }
      setRate(Number(eventKey));
      getMangaDetail(mangaId);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in to rate!", {
          theme: "colored",
        });
      } else {
        console.error(error);
      }
    }
  };

  const handleRemoveRate = async () => {
    if (rate !== null) {
      try {
        await deleteRating(mangaId);
        setRate(null);
        getMangaDetail(mangaId);
      } catch {
        console.error("Something went wrong!", {
          theme: "colored",
        });
      }
    }
  };

  const handleFollow = async () => {
    try {
      if (!follow) {
        await postFollow(mangaId);
        setFollow(true);
      } else {
        await deleteFollow(mangaId);
        setFollow(false);
      }
      getMangaDetail(mangaId);
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

  const handleChangeChapter = (pageNum) => {
    setChapterPage(pageNum);
  };

  const fetchUserRating = async (mangaId) => {
    try {
      const response = await getCurrentUserRating(mangaId);
      const userRating = response.data;
      if (userRating) {
        setRate(userRating);
      }
    } catch (error) {
      console.error("Error retrieving user rating:", error);
    }
  };

  const getMangaDetail = async (id) => {
    try {
      const result = await getMangaByIdForUser(id);
      setManga(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setManga(null);
      }
    }
  };

  const getChaptersByPage = async (id, page) => {
    try {
      const result = await getChapterByMangaIdForUser(id, { page });
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
      const response = await getCurrentUserFollow(mangaId);
      setFollow(response.data);
    } catch (error) {
      console.error("Error retrieving user rating:", error);
    }
  };

  useEffect(() => {
    getMangaDetail(mangaId);
    fetchUserRating(mangaId);
    getChaptersByPage(mangaId, chapterPage);
    fetchUserFollow(mangaId);
  }, [mangaId, chapterPage]);

  return (
    <>
      <ToastContainer />
      <MangaBanner
        manga={manga}
        rate={rate}
        handleSelectRate={handleSelectRate}
        handleRemoveRate={handleRemoveRate}
        follow={follow}
        handleFollow={handleFollow}
      />
      <ChapterSection
        chapters={chapters}
        page={chapterPage}
        totalPages={totalChapterPages}
        onPageChange={handleChangeChapter}
      />
      <CommentSection type="manga" typeId={mangaId} />
    </>
  );
}
