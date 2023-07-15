import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./styles.css";
import CommentSection from "../../../components/comment";
import {
  getChapterByMangaIdForUser,
  getMangaByIdForUser,
} from "../../../service/api.manga";
import MangaBanner from "./components/MangaBanner";
import ChapterSection from "./components/ChapterSection";
import {
  deleteRating,
  getCurrentUserRating,
  postRating,
  putRating,
} from "../../../service/api.rating";

export default function MangaDetail() {
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const { mangaId } = useParams();
  const [rate, setRate] = useState(null);

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
    } catch {
      console.error("Something went wrong!");
    }
  };

  const handleRemoveRate = async () => {
    if (rate !== null) {
      try {
        await deleteRating(mangaId);
        setRate(null);
        getMangaDetail(mangaId);
      } catch {
        console.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    setPage(parseInt(searchParams.get("page") || 1));
  }, [searchParams]);

  useEffect(() => {
    getMangaDetail(mangaId);
    fetchUserRating(mangaId);
    getChaptersByPage(mangaId, page);
  }, [mangaId, page]);

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
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setChapters(null);
      }
    }
  };

  return (
    <>
      <MangaBanner
        manga={manga}
        rate={rate}
        handleSelectRate={handleSelectRate}
        handleRemoveRate={handleRemoveRate}
      />
      <ChapterSection
        chapters={chapters}
        page={page}
        totalPages={totalPages}
        setSearchParams={setSearchParams}
      />
      <CommentSection />
    </>
  );
}
