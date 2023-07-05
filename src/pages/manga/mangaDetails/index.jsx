import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import ChaptersList from "./components/ChapterList";
import CommentSection from "../../../components/comment";
import { getMangaByIdForUser } from "../../../service/api.manga";
import MangaBanner from "./components/MangaBanner";

export default function MangaDetail() {
  const [manga, setManga] = useState(null);
  const { mangaId } = useParams();

  useEffect(() => {
    getMangaDetail(mangaId);
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
  console.log("manga", manga);
  return (
    <>
      <MangaBanner manga={manga} />
      <ChaptersList />
      <CommentSection />
    </>
  );
}
