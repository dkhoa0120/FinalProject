import { Image } from "react-bootstrap";

function CountryFlag({ lang }) {
  const flagImages = {
    Japanese: "Japan.png",
    Korean: "Korea.png",
    English: "England.png",
    Vietnamese: "VietNam.png",
    Chinese: "China.png",
  };
  const flagImage = flagImages[lang];

  return (
    <Image
      style={{ height: "30px", width: "30px" }}
      src={`${process.env.PUBLIC_URL}/img/flag/${flagImage}`}
    />
  );
}

export default CountryFlag;
