import { Image } from "react-bootstrap";

function CountryFlag({ originalLanguage }) {
  const vietnam = process.env.PUBLIC_URL + "/img/flag/VietNam.png";
  const china = process.env.PUBLIC_URL + "/img/flag/China.png";
  const japan = process.env.PUBLIC_URL + "/img/flag/Japan.png";
  const korea = process.env.PUBLIC_URL + "/img/flag/Korea.png";
  const england = process.env.PUBLIC_URL + "/img/flag/England.png";

  return (
    <>
      {originalLanguage === "Japanese" && (
        <Image style={{ height: "30px", width: "30px" }} src={japan} />
      )}
      {originalLanguage === "Korean" && (
        <Image style={{ height: "30px", width: "30px" }} src={korea} />
      )}
      {originalLanguage === "English" && (
        <Image style={{ height: "30px", width: "30px" }} src={england} />
      )}
      {originalLanguage === "Vietnamese" && (
        <Image style={{ height: "30px", width: "30px" }} src={vietnam} />
      )}
      {originalLanguage === "Chinese" && (
        <Image style={{ height: "30px", width: "30px" }} src={china} />
      )}
    </>
  );
}

export default CountryFlag;
