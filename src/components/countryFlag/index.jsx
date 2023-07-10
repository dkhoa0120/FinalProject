import { Image } from "react-bootstrap";

function CountryFlag({ lang, size = 30 }) {
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
      style={{ height: `${size}px`, width: `${size}px` }}
      src={`${process.env.PUBLIC_URL}/img/flag/${flagImage}`}
    />
  );
}

export default CountryFlag;
