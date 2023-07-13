import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CountryFlag from "../../../../components/countryFlag";

export default function ChapterGroup({ chapters }) {
  const [isDescending, setIsDescending] = useState(false);
  const handleClick = () => {
    setIsDescending(!isDescending);
  };
  const calculateTimeDifference = (createdAt) => {
    const currentDate = new Date();
    const chapterDate = new Date(createdAt);
    const timeDifference = Math.abs(currentDate - chapterDate);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference < 50) {
      return `${minutesDifference} minutes ago`;
    } else if (minutesDifference < 1440) {
      const hoursDifference = Math.floor(minutesDifference / 60);
      return `${hoursDifference} hours ago`;
    } else {
      const daysDifference = Math.floor(minutesDifference / 1440);
      return `${daysDifference} days ago`;
    }
  };

  return (
    <>
      <Container fluid className="general-container">
        <Row>
          <Col xs={12} md={6} xl={8}>
            <div
              className="general-container-title"
              style={{ textDecorationLine: "underline" }}
            >
              Chapters list
            </div>
          </Col>
          <Col xs={12} md={6} xl={4}>
            <p className="text-center">
              <button className="button-50">Read First</button>
              &nbsp;
              <button className="button-50">Read Last</button>
              &nbsp;
              <button className="button-50" onClick={handleClick}>
                {!isDescending ? (
                  <i class="fa-solid fa-arrow-down-short-wide"></i>
                ) : (
                  <i class="fa-solid fa-arrow-up-short-wide"></i>
                )}
              </button>
            </p>
          </Col>
        </Row>
        <div className="general-container">
          {chapters &&
            Object.entries(chapters)
              .sort(([numberA], [numberB]) => numberA - numberB)
              .map(([number, chapterList]) => (
                <>
                  <div
                    key={number}
                    className="general-container-title"
                    style={{ fontSize: "18px" }}
                  >
                    Chapter {number}
                  </div>
                  <Container fluid style={{ paddingLeft: "30px" }}>
                    {chapterList.map((chapter) => (
                      <Row key={chapter.id}>
                        <Col xs={12} xl={4}>
                          <p className="text-truncate">
                            <CountryFlag lang={chapter.language} />{" "}
                            {chapter.name}
                          </p>
                        </Col>
                        <Col xs={6} xl={2}>
                          <p className="text-truncate">
                            <i className="fa-regular fa-clock"></i> Group
                          </p>
                        </Col>
                        <Col xs={6} xl={2}>
                          <p className="text-truncate">
                            <i className="fa-regular fa-clock"></i>{" "}
                            {chapter.uploader.name}
                          </p>
                        </Col>
                        <Col xs={6} xl={2}>
                          <p title={chapter.createdAt}>
                            <i className="fa-regular fa-clock"></i>{" "}
                            {calculateTimeDifference(chapter.createdAt)}
                          </p>
                        </Col>
                        <Col xs={6} xl={2}>
                          <p>
                            <i className="fa-regular fa-eye"></i>{" "}
                            {chapter.viewCount} views
                          </p>
                        </Col>
                      </Row>
                    ))}
                  </Container>
                </>
              ))}
        </div>
      </Container>
    </>
  );
}
