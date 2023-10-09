import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PaginationNoParams from "../../../components/paginationNoParams";
import { Link } from "react-router-dom";
import * as groupApi from "../../../service/api.group";
import CountryFlag from "../../../components/countryFlag";
import { calculateTimeDifference } from "../../../utilities/dateTimeHelper";

export default function Uploads({ groupId }) {
  const [groupMangaLists, setGroupMangaLists] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    const getChaptersByPage = async (id, page) => {
      try {
        const result = await groupApi.getGroupMangaList(id, { page });
        setGroupMangaLists(result.data.itemList);
        setTotalPages(result.data.totalPages);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setGroupMangaLists(null);
        }
      }
    };
    getChaptersByPage(groupId, currentPage);
  }, [groupId, currentPage]);

  return (
    <>
      <Container fluid>
        {groupMangaLists ? (
          groupMangaLists.map((m, index) => {
            return (
              <>
                <div className="chapter-group-container" key={index}>
                  <div>
                    <Link to={`/mangas/${m.manga.id}`} className="card-link">
                      <img
                        src={
                          m.manga.coverPath || "/img/error/coverNotFound.png"
                        }
                        style={{ width: "100px" }}
                        alt="manga's cover"
                      ></img>
                    </Link>
                  </div>
                  <div className="flex-grow-1">
                    <Link to={`/mangas/${m.manga.id}`} className="card-link">
                      <p
                        className="text-limit-1"
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
                        <Row className="chapter-row" key={index}>
                          <Col xs={12} md={4}>
                            <Link
                              to={`/chapters/${c.id}`}
                              className="card-link"
                            >
                              <div className="chapter-name">
                                <CountryFlag key={c.id} lang={c.language} />
                                <p className="text-limit-1">
                                  Ch.{c.number} - {c.name}
                                </p>
                              </div>
                            </Link>
                          </Col>
                          <Col xs={6} md={2} className="hide-when-mobile">
                            <p className="text-truncate">
                              <i className="fa-regular fa-user"></i>{" "}
                              {c.uploadingGroup.name}
                            </p>
                          </Col>
                          <Col xs={6} md={2}>
                            <Link
                              to={`/profile/${c.uploader.id}`}
                              className="card-link"
                            >
                              <p className="text-truncate ">
                                <i className="fa-regular fa-user"></i>{" "}
                                {c.uploader.name}
                              </p>
                            </Link>
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
                              <i className="fa-regular fa-eye"></i>{" "}
                              {c.viewCount}{" "}
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
