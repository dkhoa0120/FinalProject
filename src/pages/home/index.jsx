import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import MangasList from "../../components/mangaList";
import "./styles.css";
import CarouselFade from "../../components/carousel";
import { getMangasForUser } from "../../service/api.manga";

function Home() {
  const banner = process.env.PUBLIC_URL + "/img/banner/banner.png";

  const [activeButton, setActiveButton] = useState("LatestManga");

  const handleButtonClick = (sortOption) => {
    setActiveButton(sortOption);
  };

  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    callAPI("", activeButton, 1, 8);
  }, [activeButton]);

  const callAPI = async (search, sortOption, page, pageSize) => {
    try {
      const result = await getMangasForUser({
        search,
        sortOption,
        page,
        pageSize,
      });
      setMangas(result.data.itemList);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMangas([]);
      }
    }
  };

  return (
    <div>
      <div className="home-header">
        <Container fluid>
          <Row>
            <Col xs={12} md={6} xl={9}>
              <div style={{ paddingTop: "30px" }}>
                <span className="tagline">
                  Welcome to the captivating world of manga!
                </span>
                <p className="tagline-p ">
                  Immerse yourself in an extraordinary assortment of manga.
                  Action, adventure, fantasy, mystery, romance, and
                  more—thousands of manga volumes for every fan!!
                </p>
              </div>
            </Col>
            <Col xs={12} md={6} xl={3}>
              <div>
                <Image style={{ width: "60%", height: "50%" }} src={banner} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <CarouselFade />
      <div className="General-Container">
        <div
          style={{ display: "flex", paddingLeft: "20px", paddingRight: "20px" }}
        >
          <Button
            className="mb-4 w-100"
            variant={activeButton === "LatestManga" ? "dark" : "light"}
            onClick={() => handleButtonClick("LatestManga")}
          >
            Latest Manga
          </Button>
          &nbsp;
          <Button
            className="mb-4 w-100"
            variant={activeButton === "LatestChapter" ? "dark" : "light"}
            onClick={() => handleButtonClick("LatestChapter")}
          >
            Latest Chapter
          </Button>
        </div>
        <div>
          {activeButton === "LatestManga" && (
            <MangasList
              header="Latest Updated Manga"
              link="/Manga?sortOption=LatestManga"
              data={mangas}
            />
          )}
          {activeButton === "LatestChapter" && (
            <MangasList
              header="Latest Updated Chapter"
              link="/Manga?sortOption=LatestChapter"
              data={mangas}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
