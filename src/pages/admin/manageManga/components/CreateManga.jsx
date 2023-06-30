import { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import MultiSelect from "../../../../components/multiSelect";
import { createManga } from "../../../../service/api.manga";
import { getLanguage } from "../../../../service/api.helper";
import { getCategories } from "../../../../service/api.category";
import { getAuthors } from "../../../../service/api.author";

function CreateManga(props) {
  const [originalTitle, setOriginalTitle] = useState("");
  const [coverPath, setCoverPath] = useState(null);
  const [alternativeTitles, setAlternativeTitles] = useState("");
  const [originalLanguage, setOriginalLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [authorIds, setAuthorIds] = useState([]);
  const [publishYear, setPublishYear] = useState("");

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("originalTitle", originalTitle);
    formData.append("coverImage", coverPath);
    formData.append("alternativeTitles", alternativeTitles);
    formData.append("originalLanguage", originalLanguage);
    formData.append("description", description);
    formData.append("categoryIds", categoryIds);
    formData.append("authorIds", authorIds);
    formData.append("publishYear", publishYear);

    try {
      await createManga(formData);
      props.handleClose();
      setOriginalTitle("");
      setCoverPath(null);
      setAlternativeTitles("");
      setOriginalLanguage("");
      setDescription("");
      setCategoryIds([]);
      setAuthorIds([]);
      setPublishYear("");
      toast.success("A manga has been created");
      props.getMangas();
    } catch (error) {
      toast.error(error);
    }
  };

  //handle selected language
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

  const mapToOptions = (items) => {
    return items.reduce((options, item) => {
      options[item.id] = item.name;
      return options;
    }, {});
  };

  const handleCategoryOptions = async (search) => {
    try {
      let res = await getCategories({ search, excludeDeleted: true });
      let categories = res.data.itemList.filter(
        (category) => !categoryIds.includes(category.id)
      );
      return mapToOptions(categories);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return {};
      }
    }
  };

  const handleAuthorOptions = async (search) => {
    try {
      let res = await getAuthors({ search, excludeDeleted: true });
      let authors = res.data.itemList.filter(
        (author) => !authorIds.includes(author.id)
      );
      return mapToOptions(authors);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return {};
      }
    }
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Manga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xl={8}>
              {" "}
              <Form.Label>Original Title</Form.Label>
              <Form.Control
                type="text"
                value={originalTitle}
                onChange={(e) => setOriginalTitle(e.target.value)}
                required
              />
            </Col>
            <Col xl={4}>
              {" "}
              <Form.Label>Cover</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCoverPath(e.target.files[0])}
                required
              />
            </Col>
          </Row>{" "}
          &nbsp;
          <Row>
            <Col>
              <Form.Label>Category</Form.Label>
              <MultiSelect
                placeholder="Search category"
                onSearchOptions={handleCategoryOptions}
                onChangeOptions={(options) => setCategoryIds(options)}
              />
            </Col>
          </Row>{" "}
          &nbsp;
          <Row>
            <Col>
              <Form.Label>Author</Form.Label>
              <MultiSelect
                placeholder="Search author"
                onSearchOptions={handleAuthorOptions}
                onChangeOptions={(options) => setAuthorIds(options)}
              />
            </Col>
          </Row>{" "}
          &nbsp;
          <Row>
            <Col>
              {" "}
              <Form.Label>Publish Year</Form.Label>
              <Form.Control
                type="number"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                required
              />
            </Col>
            <Col>
              {" "}
              <Form.Label>Alternative Titles</Form.Label>
              <Form.Control
                type="text"
                value={alternativeTitles}
                onChange={(e) => setAlternativeTitles(e.target.value)}
              />
            </Col>
            <Col>
              {" "}
              <Form.Label>Original Language</Form.Label>
              <Form.Select
                as="select"
                value={originalLanguage}
                onChange={(e) => setOriginalLanguage(e.target.value)}
                required
              >
                <option>Select Language</option>
                {languageOptions.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </Form.Select>
            </Col>{" "}
            &nbsp;
          </Row>{" "}
          &nbsp;
          <Row>
            <Col>
              {" "}
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
          <Button variant="success" onClick={handleSave}>
            Add New
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateManga;
