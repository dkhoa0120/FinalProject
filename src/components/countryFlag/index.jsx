import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function CountryFlag(props) {
  const vietnam = process.env.PUBLIC_URL + "/img/flag/VietNam.png";
  const china = process.env.PUBLIC_URL + "/img/flag/China.png";
  const japan = process.env.PUBLIC_URL + "/img/flag/Japan.png";
  const korea = process.env.PUBLIC_URL + "/img/flag/Korea.png";
  const england = process.env.PUBLIC_URL + "/img/flag/England.png";

  return (
    <>
      <Link to={`/Manga/${props.manga.id}`} className="card-link">
        {props.manga.originalLanguage === "Japanese" && (
          <Image style={{ height: "30px", width: "30px" }} src={japan} />
        )}
        {props.manga.originalLanguage === "Korean" && (
          <Image style={{ height: "30px", width: "30px" }} src={korea} />
        )}
        {props.manga.originalLanguage === "English" && (
          <Image style={{ height: "30px", width: "30px" }} src={england} />
        )}
        {props.manga.originalLanguage === "Vietnamese" && (
          <Image style={{ height: "30px", width: "30px" }} src={vietnam} />
        )}
        {props.manga.originalLanguage === "Chinese" && (
          <Image style={{ height: "30px", width: "30px" }} src={china} />
        )}
        <h4>{props.manga.originalTitle}</h4>
      </Link>
    </>
  );
}

export default CountryFlag;
