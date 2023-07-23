import { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import MultiSelect from "../../../../components/multiSelect";
import { createManga } from "../../../../service/api.manga";
import { getLanguage } from "../../../../service/api.helper";
import { getCategories } from "../../../../service/api.category";
import { getAuthors } from "../../../../service/api.author";

export default function CreateManga({ show, handleClose, getMangas }) {
  const [mangaInput, setMangaInput] = useState({
    categoryIds: [],
    authorIds: [],
  });

  const handleSave = async () => {
    const formData = new FormData();
    for (const key in mangaInput) {
      formData.append(key, mangaInput[key]);
    }

    try {
      await createManga(formData);
      handleClose();
      setMangaInput({
        categoryIds: [],
        authorIds: [],
      });
      toast.success("A manga has been created");
      getMangas();
    } catch (error) {
      const errors = error.response.data.errors;
      const firstErrorKey = Object.keys(errors)[0];
      toast.error(`${firstErrorKey}: ${errors[firstErrorKey]}`);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setMangaInput({ ...mangaInput, [name]: value });
  };

  const handleSelectImage = (e) => {
    const { name, files } = e.target;
    setMangaInput({ ...mangaInput, [name]: files[0] });
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
        (category) => !mangaInput.categoryIds.includes(category.id)
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
        (author) => !mangaInput.authorIds.includes(author.id)
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
      <Modal show={show} onHide={handleClose} size="lg">
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
                name="originalTitle"
                value={mangaInput.originalTitle || ""}
                onChange={handleChangeInput}
                required
              />
            </Col>
            <Col xl={4}>
              {" "}
              <Form.Label>Cover</Form.Label>
              <Form.Control
                type="file"
                name="coverImage"
                onChange={handleSelectImage}
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
                onChangeOptions={(options) =>
                  setMangaInput({ ...mangaInput, categoryIds: options })
                }
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
                onChangeOptions={(options) =>
                  setMangaInput({ ...mangaInput, authorIds: options })
                }
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
                name="publishYear"
                value={mangaInput.publishYear || ""}
                onChange={handleChangeInput}
                required
              />
            </Col>
            <Col>
              {" "}
              <Form.Label>Alternative Titles</Form.Label>
              <Form.Control
                type="text"
                name="alternativeTitles"
                value={mangaInput.alternativeTitles || ""}
                onChange={handleChangeInput}
              />
            </Col>
            <Col>
              {" "}
              <Form.Label>Original Language</Form.Label>
              <Form.Select
                as="select"
                name="originalLanguage"
                value={mangaInput.originalLanguage || ""}
                onChange={handleChangeInput}
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
                name="description"
                value={mangaInput.description}
                onChange={handleChangeInput}
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
