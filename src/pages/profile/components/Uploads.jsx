import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PaginationNoParams from "../../../components/paginationNoParams";
import { Link, useParams } from "react-router-dom";
import * as mangaApi from "../../../service/api.manga";

export default function Uploads() {
  const [mangaGroups, setMangaGroups] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { userId } = useParams();

  console.log(mangaGroups);

  // formatDate
  function formatDate(inputDate) {
    const dateObj = new Date(inputDate);

    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const year = String(dateObj.getUTCFullYear()).slice(2); // Get last two digits of the year

    return `${day}/${month}/${year}`;
  }

  const handleChangePage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    const getChaptersByPage = async (id, page) => {
      try {
        const result = await mangaApi.getMangaInProfile(id, { page });
        setMangaGroups(result.data.itemList);
        setTotalPages(result.data.totalPages);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMangaGroups(null);
        }
      }
    };
    getChaptersByPage(userId, currentPage);
  }, [userId, currentPage]);

  return (
    <>
      <Container fluid>
        {mangaGroups ? (
          mangaGroups.map((m, index) => {
            return (
              <>
                {" "}
                <Row key={index}>
                  <Col
                    lg={2}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Link to={`/Manga/${m.manga.id}`} className="card-link">
                      <img
                        src={
                          m.manga.coverPath || "/img/error/coverNotFound.png"
                        }
                        style={{ width: "150px" }}
                        alt="manga's cover"
                      ></img>
                    </Link>
                  </Col>
                  <Col lg={10}>
                    <Link to={`/Manga/${m.manga.id}`} className="card-link">
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        {m.manga.originalTitle}
                      </p>
                    </Link>
                    {m.chapters ? (
                      m.chapters.map((c, index) => (
                        <Row key={index}>
                          <Col xs={12} md={3}>
                            <Link to={`/Chapter/${c.id}`} className="card-link">
                              <span className="text-truncate">{c.name}</span>
                            </Link>
                          </Col>
                          <Col xs={6} md={2}>
                            <p className="text-truncate">
                              <i className="fa-regular fa-user"></i>{" "}
                              {c.uploadingGroup.name}
                            </p>
                          </Col>
                          <Col xs={6} md={2}>
                            <p className="text-truncate">
                              <i className="fa-regular fa-user"></i>{" "}
                              {c.uploader.name}
                            </p>
                          </Col>
                          <Col xs={6} md={2}>
                            <p className="text-truncate">
                              <i className="fa-regular fa-clock"></i>{" "}
                              {formatDate(c.createdAt)}
                            </p>
                          </Col>
                          <Col xs={6} md={2}>
                            <p className="text-truncate">
                              <i className="fa-regular fa-eye"></i>{" "}
                              {c.viewCount}
                            </p>
                          </Col>
                        </Row>
                      ))
                    ) : (
                      <p></p>
                    )}
                  </Col>
                </Row>
                <hr style={{ margin: "1rem 2rem 0.5rem" }}></hr>
              </>
            );
          })
        ) : (
          <p></p>
        )}
      </Container>
      <div className="d-flex justify-content-center">
        <PaginationNoParams
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handleChangePage}
        />
      </div>
    </>
  );
}
