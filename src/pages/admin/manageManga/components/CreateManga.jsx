import { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { createManga } from "../../../../service/api.manga";
import { getLanguage } from "../../../../service/api.helper";
import { getCategories } from "../../../../service/api.category";
import { getAuthors } from "../../../../service/api.author";
import { Controller, useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";

export default function CreateManga({ show, handleClose, getMangas }) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

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

  const handleCategoryOptions = async (search) => {
    try {
      let res = await getCategories({ search, excludeDeleted: true });
      return res.data.itemList.map((category) => ({
        value: category.id,
        label: category.name,
      }));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return [];
      }
    }
  };

  const handleAuthorOptions = async (search) => {
    try {
      let res = await getAuthors({ search, excludeDeleted: true });
      return res.data.itemList.map((author) => ({
        value: author.id,
        label: author.name,
      }));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return [];
      }
    }
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    const formData = new FormData();
    for (const key in data) {
      if (key === "categoryIds" || key === "authorIds") {
        let itemIds = data[key].map((item) => item.value);
        formData.append(key, itemIds);
        continue;
      }
      formData.append(key, data[key]);
    }

    try {
      await createManga(formData);
      handleClose();
      reset();
      toast.success("A manga has been created");
      getMangas();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Manga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="create-manga-form" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xl={8}>
                <Form.Label>
                  Original Title{" "}
                  {errors.originalTitle && (
                    <i
                      title={errors.originalTitle.message}
                      className="fa-solid fa-circle-exclamation"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </Form.Label>
                <Form.Control
                  type="text"
                  {...register("originalTitle", {
                    required: "This field is required",
                    minLength: {
                      value: 3,
                      message: "This field must be at least 3 characters",
                    },
                  })}
                />
              </Col>
              <Col xl={4}>
                <Form.Label>Cover</Form.Label>
                <Form.Control type="file" {...register("coverImage")} />
              </Col>
            </Row>
            &nbsp;
            <Row>
              <Col>
                <Form.Label>
                  Category{" "}
                  {errors.categoryIds && (
                    <i
                      title={errors.categoryIds.message}
                      className="fa-solid fa-circle-exclamation"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </Form.Label>
                <Controller
                  name="categoryIds"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <AsyncSelect
                      {...field}
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={handleCategoryOptions}
                    />
                  )}
                />
              </Col>
            </Row>
            &nbsp;
            <Row>
              <Col>
                <Form.Label>Author</Form.Label>
                <Controller
                  name="authorIds"
                  control={control}
                  render={({ field }) => (
                    <AsyncSelect
                      {...field}
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={handleAuthorOptions}
                    />
                  )}
                />
              </Col>
            </Row>
            &nbsp;
            <Row>
              <Col>
                <Form.Label>Publish Year</Form.Label>
                <Form.Control
                  type="number"
                  {...register("publishYear", {
                    required: true,
                  })}
                />
              </Col>
              <Col>
                <Form.Label>Alternative Titles</Form.Label>
                <Form.Control type="text" {...register("alternativeTitles")} />
              </Col>
              <Col>
                <Form.Label>Original Language</Form.Label>
                <Form.Select
                  {...register("originalLanguage", { required: true })}
                >
                  <option value="">Select...</option>
                  {languageOptions.map((language, index) => (
                    <option key={index} value={language}>
                      {language}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              &nbsp;
            </Row>
            &nbsp;
            <Row>
              <Col>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("description")}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" form="create-manga-form">
            Add New
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
