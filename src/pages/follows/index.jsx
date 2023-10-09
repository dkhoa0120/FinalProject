import { Link, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import CountryFlag from "../../components/countryFlag";
import { useEffect, useState } from "react";
import * as followApi from "../../service/api.follow";
import { calculateTimeDifference } from "../../utilities/dateTimeHelper";

export default function FollowedManga() {
  const [followedManga, setFollowedManga] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangePage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    const getChaptersByPage = async (page) => {
      try {
        const result = await followApi.getFollowedMangas({ page });
        setFollowedManga(result.data.itemList);
        setTotalPages(result.data.totalPages);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setFollowedManga(null);
        }
      }
    };
    getChaptersByPage(currentPage);
  }, [currentPage]);
  return (
    <Container fluid>
      {followedManga ? (
        followedManga.map((m) => {
          return (
            <div className="chapter-group-container" key={m.manga.id}>
              <div>
                <Link to={`/mangas/${m.manga.id}`} className="card-link">
                  <img
                    src={m.manga.coverPath || "/img/error/coverNotFound.png"}
                    style={{ width: "100px" }}
                    alt="manga's cover"
                  ></img>
                </Link>
              </div>
              <div className="flex-grow-1">
                <Link to={`/mangas/${m.manga.id}`} className="card-link">
                  <p className="text-limit-1 manga-original-title">
                    {m.manga.originalTitle}
                  </p>
                </Link>
                {m.chapters ? (
                  m.chapters.map((c) => (
                    <Row className="chapter-row" key={c.id}>
                      <Col xs={12} md={4}>
                        <Link to={`/chapters/${c.id}`} className="card-link">
                          <div className="chapter-name">
                            <CountryFlag lang={c.language} />
                            <p className="text-limit-1">
                              Ch.{c.number} - {c.name}
                            </p>
                          </div>
                        </Link>
                      </Col>
                      <Col xs={6} md={2}>
                        <Link
                          to={`/groups/${c.uploadingGroup.id}`}
                          className="card-link"
                        >
                          <p className="text-truncate">
                            <i className="fa-regular fa-user"></i>{" "}
                            {c.uploadingGroup.name}
                          </p>
                        </Link>
                      </Col>
                      <Col xs={6} md={2} className="hide-when-mobile">
                        <p className="text-truncate ">
                          <i className="fa-regular fa-user"></i>{" "}
                          {c.uploader.name}
                        </p>
                      </Col>
                      <Col xs={6} md={2}>
                        <p
                          className="text-truncate"
                          title={new Date(c.createdAt).toLocaleString()}
                        >
                          <i className="fa-regular fa-clock"></i>{" "}
                          {calculateTimeDifference(c.createdAt)}
                        </p>
                      </Col>
                      <Col xs={6} md={2} className="hide-when-mobile">
                        <p className="text-truncate">
                          <i className="fa-regular fa-eye"></i> {c.viewCount}{" "}
                          {c.viewCount >= 2 ? "views" : "view"}
                        </p>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p></p>
      )}
    </Container>
  );
}
