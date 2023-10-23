import { Col, Container, Row } from "react-bootstrap";

export default function About({ groupDetails }) {
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
          <p>{groupDetails?.biography}</p>
        </Col>
        <Col md={3}>
          <h1 className="about-title">Stats</h1>
          <hr />
          <ul>
            <li>Created at {formatDate(groupDetails?.createdAt)}</li>
            <li>
              {groupDetails?.uploadedChapterNumber} uploaded{" "}
              {groupDetails?.uploadedChapterNumber >= 2
                ? "chapters"
                : "chapter"}
            </li>
            <li>
              {groupDetails?.viewGainedNumber}{" "}
              {groupDetails?.viewGainedNumber >= 2 ? "views" : "view"}
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
