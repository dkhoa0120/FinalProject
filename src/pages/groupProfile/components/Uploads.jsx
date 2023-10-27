import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as groupApi from "../../../service/api.group";
import CountryFlag from "../../../components/countryFlag";
import { calculateTimeDifference } from "../../../utilities/dateTimeHelper";
import MangaBlock from "../../../components/mangaBlock";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

export default function Uploads({ groupId }) {
  const [groupMangaLists, setGroupMangaLists] = useState([]);
  const [loadingPost, setLoadingPost] = useState(false);
  const [outOfPost, setOutOfPost] = useState(false);

  const fetchUploadMangas = async (groupId) => {
    try {
      const result = await groupApi.getGroupUploadMangas(groupId);
      setGroupMangaLists(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setGroupMangaLists(null);
      }
    }
  };

  const handleSeeMoreMangas = async (groupId, updatedAtCursor) => {
    try {
      const newGroupMangaLists = await groupApi.getGroupUploadMangas(groupId, {
        updatedAtCursor,
      });
      setGroupMangaLists([...groupMangaLists, ...newGroupMangaLists.data]);

      // Set outOfComment to disable loading more comment in scroll event below
      if (newGroupMangaLists.data.length > 0) {
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
        groupMangaLists.length > 0 &&
        !outOfPost
      ) {
        setLoadingPost(true);
        setTimeout(() => {
          handleSeeMoreMangas(
            groupId,
            groupMangaLists[groupMangaLists.length - 1]?.updatedAt
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
  }, [groupMangaLists]);

  useEffect(() => {
    fetchUploadMangas(groupId);
  }, [groupId]);

  return (
    <>
      <Container fluid>
        {groupMangaLists ? (
          groupMangaLists.map((m) => <MangaBlock manga={m} />)
        ) : (
          <p></p>
        )}
      </Container>

      {loadingPost && <SpinnerLoading />}
    </>
  );
}
