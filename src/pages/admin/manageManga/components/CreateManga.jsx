import { useContext } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as mangaApi from "../../../../service/api.manga";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { handleAuthorOptions } from "./SelectOptions";
import { CategoryContext } from "../../../../context/CategoryContext";
import { languageOptions } from "../../../../constants/languages";

export default function CreateManga({
  show,
  handleClose,
  getMangas,
  search,
  page,
}) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const { categoryOptions } = useContext(CategoryContext);
  const animatedComponents = makeAnimated();

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "categoryIds" || key === "authorIds") {
        let itemIds = data[key].map((item) => item.value);
        formData.append(key, itemIds);
        continue;
      }
      if (key === "coverImage") {
        let coverImageFile = data[key][0];
        formData.append(key, coverImageFile);
        continue;
      }
      if (key === "originalLanguage") {
        formData.append(key, data[key].value);
      }
      formData.append(key, data[key]);
    }

    try {
      await mangaApi.createManga(formData);
      handleClose();
      reset();
      toast.success("A manga has been created");
      getMangas(search, page);
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
                <Form.Control
                  name="coverImage"
                  type="file"
                  {...register("coverImage")}
                />
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
                    <Select
                      {...field}
                      isMulti
                      options={categoryOptions}
                      components={animatedComponents}
                    />
                  )}
                />
              </Col>
            </Row>
            &nbsp;
            <Row>
              <Col>
                <Form.Label>
                  Author{" "}
                  {errors.authorIds && (
                    <i
                      title={errors.authorIds.message}
                      className="fa-solid fa-circle-exclamation"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </Form.Label>
                <Controller
                  name="authorIds"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <AsyncSelect
                      {...field}
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={handleAuthorOptions}
                      components={animatedComponents}
                    />
                  )}
                />
              </Col>
            </Row>
            &nbsp;
            <Row>
              <Col>
                <Form.Label>
                  Publish Year{" "}
                  {errors.publishYear && (
                    <i
                      title={errors.publishYear.message}
                      className="fa-solid fa-circle-exclamation"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </Form.Label>
                <Form.Control
                  type="number"
                  {...register("publishYear", {
                    required: "This field is required",
                    min: {
                      value: 1000,
                      message: "Publish Year must be after 1000",
                    },
                    max: {
                      value: 2100,
                      message: "Publish Year must be before 2100",
                    },
                  })}
                />
              </Col>
              <Col>
                <Form.Label>Alternative Titles</Form.Label>
                <Form.Control type="text" {...register("alternativeTitles")} />
              </Col>
              <Col>
                <Form.Label>
                  Original Language{" "}
                  {errors.originalLanguage && (
                    <i
                      title={errors.originalLanguage.message}
                      className="fa-solid fa-circle-exclamation"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </Form.Label>
                <Controller
                  name="originalLanguage"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select {...field} options={languageOptions} />
                  )}
                />
              </Col>
              &nbsp;
            </Row>
            &nbsp;
            <Row>
              <Col>
                <Form.Label>
                  Description {""}
                  {errors.description && (
                    <i
                      title={errors.description.message}
                      className="fa-solid fa-circle-exclamation"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("description", {
                    maxLength: {
                      value: 1000,
                      message: "This field must be less than 1000 characters",
                    },
                  })}
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
