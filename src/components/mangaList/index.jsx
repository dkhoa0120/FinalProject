/* eslint-disable jsx-a11y/alt-text */
import "./styles.css";
import React, { useState, useEffect } from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import china from "../../img/flag/China.png";
import japan from "../../img/flag/Japan.png";
import korea from "../../img/flag/Korea.png";
import england from "../../img/flag/England.png";
import vietnam from "../../img/flag/VietNam.png";

function MangasList(props) {
  const { data } = props;

  return (
    <div>
      <Row className="px-4 my-5">
        {data.length > 0 ? (
          data.map((manga) => (
            <div key={manga.id} className="col-md-3 col-lg-3">
              <div>
                <div className="proj-imgbx">
                  <Image className="cover" src={manga.coverPath} />
                  <div className="proj-txtx">
                    <Link to={`/Manga/${manga.id}`} className="card-link">
                      {manga.originalLanguage === "Japanese" && (
                        <Image
                          style={{ height: "30px", width: "30px" }}
                          src={japan}
                        />
                      )}
                      {manga.originalLanguage === "Korean" && (
                        <Image
                          style={{ height: "30px", width: "30px" }}
                          src={korea}
                        />
                      )}
                      {manga.originalLanguage === "English" && (
                        <Image
                          style={{ height: "30px", width: "30px" }}
                          src={england}
                        />
                      )}
                      <h4>{manga.originalTitle}</h4>
                    </Link>
                    <span className="text-limit">{manga.description}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No data found.</div>
        )}
      </Row>
      <div className="d-flex justify-content-center">
        <Link to={props.link}>
          <Button className="btn btn-dark"> See More </Button>
        </Link>
      </div>
    </div>
  );
}

export default MangasList;
