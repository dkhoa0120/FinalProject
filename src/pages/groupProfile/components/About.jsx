import { Col, Container, Row } from "react-bootstrap";

export default function About({ userStats, userDetails }) {
  function formatDate(inputDate) {
    const dateObj = new Date(inputDate);

    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const year = dateObj.getUTCFullYear();

    return `${month}/${day}/${year}`;
  }

  return (
    <Container fluid style={{ padding: "0 30px" }}>
      <Row>
        <Col md={9}>
          <h1 className="about-title">About us</h1>
          <hr />
          <p>{userDetails?.biography}</p>
        </Col>
        <Col md={3}>
          <h1 className="about-title">Stats</h1>
          <hr />
          <ul>
            <li>Joined {formatDate(userDetails?.createdAt)}</li>
            <li>{userStats.uploadedChapterNumber} uploaded chapters</li>
            <li>{userStats.viewGainedNumber} views</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
