import { Container, Row, Col, Card, Form } from "react-bootstrap";
import "./styles.css";
import { useState, createRef } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const navigate = useNavigate();
  const [oneShot, setOneShot] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const fileInputRef = createRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedImages([...selectedImages, ...files]);
    }
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleNavClick = () => {
    navigate(`/`);
  };

  return (
    <>
      <div style={{ fontSize: "25px", fontWeight: "bold" }}>
        <button className="circle-button" onClick={handleNavClick}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>{" "}
        Upload Chapter
      </div>
      &nbsp;
      <Container>
        <Card className="uploader-card">
          <Row>
            <Col xs={4} md={2} xl={1}>
              <Card.Img
                className="manga-image"
                variant="top"
                src={"/img/error/coverNotFound.png"}
                alt={"Manga cover"}
              />
            </Col>
            <Col xs={8} md={9} xl={10} style={{ padding: "20px" }}>
              <Card.Title className="manga-title text-limit-1">
                manga original title
              </Card.Title>
              <Card.Text className="manga-category">
                List of categories
              </Card.Text>
              <Card.Text className="text-limit-3">manga description</Card.Text>
            </Col>
          </Row>
        </Card>
        &nbsp;
        <hr />
        <Row>
          <Col>
            <span>Group</span>
            <Form.Control
              type="search"
              placeholder="Find group"
              aria-label="Search"
            />
          </Col>
        </Row>
        &nbsp;
        <hr />
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              onChange={() => setOneShot(!oneShot)}
              size="lg"
              label="This is a Oneshot"
            ></Form.Check>
          </Col>
        </Row>
        <Row>
          <Col md={4} lg={4} className="mb-1">
            <Form.Control
              type="search"
              placeholder="Number"
              aria-label="Number"
              disabled={oneShot}
            />
          </Col>
          <Col md={4} lg={4} className="mb-1">
            <Form.Control
              type="search"
              placeholder="Chapter number"
              aria-label="Chapter number"
              disabled={oneShot}
            />
          </Col>
          <Col md={4} lg={4} className="mb-1">
            <Select placeholder="Original Language"></Select>
          </Col>
        </Row>
        &nbsp;
        <hr />
        <Row>
          <Form.Label>Pages</Form.Label>
          <div className="image-container justify-left flex-wrap mb-4">
            {selectedImages.map((image, index) => (
              <div key={index} className="pages-upload-card flex-grow-0">
                <img
                  className="image"
                  src={URL.createObjectURL(image)}
                  alt="pages"
                />
                <button
                  className="delete-button"
                  onClick={() => handleImageDelete(index)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <button className="drag-button">
                  <i className="fa-solid fa-arrows-up-down-left-right"></i>
                </button>
                <div className="image-label">{image.name}</div>
              </div>
            ))}
            <div className="label" onClick={handleFileInputClick}>
              <i className="fa-solid fa-plus" />
              <input
                className="input-pages"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                multiple
              />
            </div>
          </div>
          {selectedImages.length > 0 ? (
            <div>
              <button
                className="btn btn-dark"
                onClick={() => setSelectedImages([])}
              >
                Remove all pages
              </button>
            </div>
          ) : (
            <></>
          )}
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <button
              className="new-to-you"
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                padding: "6px 15px",
              }}
            >
              Upload
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
