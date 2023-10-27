import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CountryFlag from "../countryFlag";
import { calculateTimeDifference } from "../../utilities/dateTimeHelper";
import "../../App.css";

export default function MangaBlock({ manga }) {
  return (
    <div className="chapter-group-container flex-grow-1" key={manga.id}>
      <div>
        <Link to={`/mangas/${manga.id}`} className="card-link">
          <img
            src={manga.coverPath || "/img/error/coverNotFound.png"}
            style={{ width: "100px" }}
            alt="manga's cover"
          ></img>
        </Link>
      </div>
      <div className="flex-grow-1">
        <Link to={`/mangas/${manga.id}`} className="card-link">
          <b className="text-limit-1" style={{ fontSize: "20px" }}>
            {manga.originalTitle}
          </b>
        </Link>
        {manga.chapters ? (
          manga.chapters.map((c) => (
            <Row
              className={"chapter-row" + (c.isViewedByUser ? " viewed" : "")}
              key={c.id}
            >
              <Col xs={12} md={4}>
                <Link to={`/chapters/${c.id}`} className="card-link">
                  <div className="chapter-name">
                    <CountryFlag key={c.id} lang={c.language} />
                    <p className="text-limit-1">
                      Ch.{c.number} - {c.name}
                    </p>
                  </div>
                </Link>
              </Col>
              <Col xs={6} md={2} className="hide-when-mobile">
                <Link
                  to={`/groups/${c.uploadingGroup.id}/Uploads`}
                  className="card-link"
                >
                  <p className="text-truncate">
                    <i className="fa-regular fa-user"></i>{" "}
                    {c.uploadingGroup.name}
                  </p>
                </Link>
              </Col>
              <Col xs={6} md={2}>
                <Link
                  to={`/profile/${c.uploader.id}/Uploads`}
                  className="card-link"
                >
                  <p
                    className={
                      "text-truncate" +
                      (!c.uploader.deletedAt ? " " : " deleted")
                    }
                  >
                    <i className="fa-regular fa-user"></i> {c.uploader.name}
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
}
