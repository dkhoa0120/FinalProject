import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as mangaApi from "../../../service/api.manga";
import MangaBlock from "../../../components/mangaBlock";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

export default function Uploads() {
  const [mangaGroups, setMangaGroups] = useState([]);
  const { userId } = useParams();
  const [loadingPost, setLoadingPost] = useState(false);
  const [outOfPost, setOutOfPost] = useState(false);

  const fetchUploadMangas = async (userId) => {
    try {
      const result = await mangaApi.getMangaInProfile(userId);
      setMangaGroups(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMangaGroups(null);
      }
    }
  };

  const handleSeeMoreMangas = async (userId, updatedAtCursor) => {
    try {
      const newMangaGroups = await mangaApi.getMangaInProfile(userId, {
        updatedAtCursor,
      });
      setMangaGroups([...mangaGroups, ...newMangaGroups.data]);

      // Set outOfComment to disable loading more comment in scroll event below
      if (newMangaGroups.data.length > 0) {
        setOutOfPost(false);
      } else {
        setOutOfPost(true);
      }
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if you've scrolled to the bottom
      if (
        window.innerHeight + Math.round(window.scrollY) >=
          document.body.offsetHeight &&
        mangaGroups.length > 0 &&
        !outOfPost
      ) {
        setLoadingPost(true);
        setTimeout(() => {
          handleSeeMoreMangas(
            userId,
            mangaGroups[mangaGroups.length - 1].updatedAt
          );
          setLoadingPost(false);
        }, 1000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mangaGroups]);

  useEffect(() => {
    fetchUploadMangas(userId);
  }, [userId]);

  return (
    <>
      <Container fluid>
        {mangaGroups ? (
          mangaGroups.map((m) => <MangaBlock manga={m} key={m.id} />)
        ) : (
          <p></p>
        )}
      </Container>

      {loadingPost && <SpinnerLoading />}
    </>
  );
}
