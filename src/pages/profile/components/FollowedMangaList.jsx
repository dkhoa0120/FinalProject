import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as listApi from "../../../service/api.follow";
import { useNavigate } from "react-router-dom";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

export default function FollowedMangaList() {
  const navigate = useNavigate();
  const [mangaLists, setMangaLists] = useState([]);
  const [loadingPost, setLoadingPost] = useState(false);
  const [outOfPost, setOutOfPost] = useState(false);

  const fetchMangaLists = async () => {
    try {
      let res = await listApi.getFollowedLists();
      setMangaLists(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  const handleSeeMoreMangaLists = async (updatedAtCursor) => {
    try {
      const newMangaLists = await listApi.getFollowedLists({
        updatedAtCursor,
      });
      setMangaLists([...mangaLists, ...newMangaLists.data]);

      // Set outOfComment to disable loading more comment in scroll event below
      if (newMangaLists.data.length > 0) {
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
        mangaLists.length > 0 &&
        !outOfPost
      ) {
        setLoadingPost(true);
        setTimeout(() => {
          handleSeeMoreMangaLists(mangaLists[mangaLists.length - 1].updatedAt);
          setLoadingPost(false);
        }, 1000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mangaLists]);

  useEffect(() => {
    fetchMangaLists();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          {mangaLists ? (
            mangaLists.map((mangaList, index) => {
              return (
                <Col md={3} key={index}>
                  <div className="manga-list">
                    {mangaList?.mangaCoverUrls.length > 0 ? (
                      <>
                        <img
                          style={{
                            width: "40%",
                            zIndex: "2",
                          }}
                          src={
                            mangaList?.mangaCoverUrls[0] ||
                            "/img/error/blankCover.png"
                          }
                          alt="mangaList's cover"
                        />
                        <img
                          style={{
                            width: "30%",
                            marginLeft: "-10px",
                            zIndex: "1",
                          }}
                          src={
                            mangaList?.mangaCoverUrls[1] ||
                            "/img/error/blankCover.png"
                          }
                          alt="mangaList's cover"
                        />
                        <img
                          style={{
                            width: "20%",
                            marginLeft: "-5px",
                          }}
                          src={
                            mangaList?.mangaCoverUrls[2] ||
                            "/img/error/blankCover.png"
                          }
                          alt="mangaList's cover"
                        />
                      </>
                    ) : (
                      <div className="empty-list">Empty list</div>
                    )}
                    <div className="manga-list-info">
                      <i className="fa-solid fa-list-ul"></i>
                      <p className="manga-list-name text-limit-2">
                        {mangaList.name}
                      </p>
                      {mangaList.type === "Private" && (
                        <i className="fa-solid fa-lock"></i>
                      )}
                    </div>
                    <div
                      className="hover-overlay"
                      onClick={() => navigate(`/manga-lists/${mangaList.id}`)}
                    >
                      <span>See more</span>
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <p></p>
          )}
        </Row>
      </Container>
      {loadingPost && <SpinnerLoading />}
    </>
  );
}
