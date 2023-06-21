import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  editManga,
  getCategory,
  getLanguage,
} from "../../../../service/Data.service";
import { toast } from "react-toastify";
import MultiSelect from "../../../../components/multiSelect";

function EditManga(props) {
  const [id, setId] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [coverPath, setCoverPath] = useState(null);
  const [alternativeTitles, setAlternativeTitles] = useState("");
  const [originalLanguage, setOriginalLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);

  const [languageOptions, setLanguageOptions] = useState([]);
  useEffect(() => {
    const fetchLanguageOptions = async () => {
      try {
        const response = await getLanguage();
        setLanguageOptions(response.data);
      } catch (error) {
        console.error("Error fetching language options:", error);
      }
    };

    fetchLanguageOptions();
  }, []);

  useEffect(() => {
    if (props.show) {
      const {
        originalTitle,
        coverPath,
        alternativeTitles,
        originalLanguage,
        description,
        publishYear,
        categories,
        id,
      } = props.dataEdit;
      setId(id || "");
      setOriginalTitle(originalTitle || "");
      setCoverPath(coverPath || null);
      setAlternativeTitles(alternativeTitles || "");
      setOriginalLanguage(originalLanguage || "");
      setDescription(description || "");
      setPublishYear(publishYear || "");
      if (categories) {
        setCategoryIds(categories.map((category) => category.id));
      }
    }
  }, [props.dataEdit, props.show]);

  console.log("Current data", props.dataEdit);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("originalTitle", originalTitle);
    formData.append("coverImage", coverPath);
    formData.append("alternativeTitles", alternativeTitles);
    formData.append("originalLanguage", originalLanguage);
    formData.append("description", description);
    formData.append("publishYear", publishYear);
    if (!coverPath) {
      toast.error("Cover is required", {
        theme: "colored",
      });
      return;
    }

    try {
      await editManga(id, formData);
      props.handleClose();
      setOriginalTitle("");
      setCoverPath(null);
      setAlternativeTitles("");
      setOriginalLanguage("");
      setDescription("");
      setPublishYear("");
      toast.success("A manga has been updated");
      props.getMangas();
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const mapToOptions = (categories) => {
    if (typeof categories === "undefined") {
      return null;
    }
    console.log("dataEdit", categories);
    const options = categories.reduce((acc, value) => {
      acc[value.id] = value.name;
      return acc;
    }, {});
    return options;
  };

  console.log("dataEdit22222222222222", props.dataEdit);

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Manga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xl={8}>
              <Form.Label>Original Title</Form.Label>
              <Form.Control
                type="text"
                value={originalTitle}
                onChange={(e) => setOriginalTitle(e.target.value)}
                required
              />
            </Col>
            <Col xl={4}>
              <Form.Label>Cover</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCoverPath(e.target.files[0])}
                required
              />
            </Col>
          </Row>
          &nbsp;
          <Row>
            <Col>
              <Form.Label>Category</Form.Label>
              <MultiSelect
                placeholder="Search category"
                initialSelectedOptions={mapToOptions(props.dataEdit.categories)}
                getOptions={async (search) => {
                  try {
                    var res = await getCategory(search);
                    return res.data.itemList;
                  } catch (err) {
                    if (err.response && err.response.status === 404) {
                      return null;
                    }
                  }
                }}
                exportOptions={(options) => setCategoryIds(options)}
              />
            </Col>
          </Row>{" "}
          &nbsp;
          <Row>
            <Col>
              <Form.Label>Publish Year</Form.Label>
              <Form.Control
                type="number"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                required
              />
            </Col>
            <Col>
              <Form.Label>Alternative Titles</Form.Label>
              <Form.Control
                type="text"
                value={alternativeTitles}
                onChange={(e) => setAlternativeTitles(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Original Language</Form.Label>
              <Form.Control
                as="select"
                value={originalLanguage}
                onChange={(e) => setOriginalLanguage(e.target.value)}
                required
              >
                <option value="">Select Language</option>
                {languageOptions.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditManga;
