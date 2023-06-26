import "./styles.css";
import { Button, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import CountryFlag from "../countryFlag";

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
                    <CountryFlag manga={manga} />
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
