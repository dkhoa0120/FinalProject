import { Col, Container, Row } from "react-bootstrap";

export default function About() {
  return (
    <Container fluid style={{ padding: "0 30px" }}>
      <Row>
        <Col md={9}>
          <h1 className="about-title">About us</h1>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
        <Col md={3}>
          <h1 className="about-title">Stats</h1>
          <hr />
          <ul>
            <li>Joined 27/8/2023</li>
            <li>10 followed manga</li>
            <li>10 uploaded manga</li>
            <li>100 views</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
