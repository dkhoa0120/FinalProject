import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Image } from "react-bootstrap";
import MangasList from "../../components/mangaList";
import "./styles.css";
import CarouselFade from "../../components/carousel";
import * as mangaApi from "../../service/api.manga";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function Home() {
  const banner = process.env.PUBLIC_URL + "/img/banner/intro.png";
  const sortOptions = [
    "LatestManga",
    "LatestChapter",
    "MostViewDaily",
    "MostFollow",
    "BestRating",
  ];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [mangas, setMangas] = useState([]);
  const [carouselMangas, setCarouselMangas] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = "3K Manga";
    loadCarouselMangas();
  }, []);

  useEffect(() => {
    if (!user) {
      setSortOption("LatestManga");
    }
  }, [user]);

  useEffect(() => {
    loadMangas(sortOption);
  }, [sortOption]);

  const loadMangas = async (sortOption) => {
    try {
      if (sortOption === "NewToYou") {
        const result = await mangaApi.getNewToYouMangas();
        setMangas(result.data);
      } else {
        const result = await mangaApi.getMangas({ sortOption });
        setMangas(result.data.itemList);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMangas([]);
      }
    }
  };

  const loadCarouselMangas = async () => {
    try {
      const result = await mangaApi.getTrendingMangas();
      setCarouselMangas(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCarouselMangas([]);
      }
    }
  };

  return (
    <>
      <div className="home-header">
        <Container fluid>
          <Row>
            <Col xs={12} md={8} xl={9}>
              <span className="tagline">
                Welcome to the captivating world of manga!
              </span>
              <p className="tagline-p ">
                Immerse yourself in an extraordinary assortment of manga.
                Action, adventure, fantasy, mystery, romance, and more—thousands
                of manga volumes for every fan!!
              </p>
            </Col>
            <Col xs={12} md={4} xl={3}>
              <div>
                <Image className="deco-image" src={banner} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <CarouselFade mangas={carouselMangas} />
      <div className="general-container">
        <div className="sort-option-container">
          {user ? (
            <button
              className={
                "new-to-you" + (sortOption === "NewToYou" ? " active" : "")
              }
              onClick={() => setSortOption("NewToYou")}
            >
              New To You
            </button>
          ) : null}
          {sortOptions.map((option, index) => (
            <Button
              key={index}
              variant={sortOption === option ? "dark" : "light"}
              onClick={() => setSortOption(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        <div>
          <MangasList data={mangas} />
          {sortOption && sortOption !== "NewToYou" ? (
            <div className="content-center">
              <Link to={`/mangas?sortOption=${sortOption}`}>
                <Button className="btn btn-dark"> See More </Button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
