import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import CommentSection from "../../../components/comment";
import {
  getChapterByMangaIdForUser,
  getMangaByIdForUser,
} from "../../../service/api.manga";
import MangaBanner from "./components/MangaBanner";
import ChapterSection from "./components/ChapterSection";

export default function MangaDetail() {
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState(null);
  const { mangaId } = useParams();

  useEffect(() => {
    getMangaDetail(mangaId);
    getChapter(mangaId);
  }, []);

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
  const getChapter = async (id) => {
    try {
      const result = await getChapterByMangaIdForUser(id);
      const groupedChapters = result.data.reduce((result, chapter) => {
        const { number } = chapter;
        if (!result[number]) {
          result[number] = [];
        }
        result[number].push(chapter);
        return result;
      }, {});
      setChapters(groupedChapters);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setChapters(null);
      }
    }
  };

  return (
    <>
      <MangaBanner manga={manga} />
      <ChapterSection chapters={chapters} />
      <CommentSection />
    </>
  );
}
