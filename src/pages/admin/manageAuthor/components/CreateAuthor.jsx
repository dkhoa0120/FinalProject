import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as authorApi from "../../../../service/api.author";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function CreateAuthor({
  show,
  handleClose,
  getAuthors,
  search,
  page,
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    try {
      await authorApi.createAuthor(data);
      handleClose();
      getAuthors(search, page);
      reset();
      toast.success("Authors has been created");
    } catch {
      toast.error("Somethings went wrong!");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="create-author-form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>
              Name{" "}
              {errors.name && (
                <i
                  title={errors.name.message}
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "red" }}
                ></i>
              )}{" "}
            </Form.Label>
            <Form.Control
              type="text"
              {...register("name", {
                required: "This field is required",
                maxLength: {
                  value: 100,
                  message: "This field must be no more than 100 characters",
                },
              })}
            />
            <br />
            <Form.Label>
              Biography{" "}
              {errors.biography && (
                <i
                  title={errors.biography.message}
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "red" }}
                ></i>
              )}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register("biography", {
                required: "This field is required",
                maxLength: {
                  value: 1000,
                  message: "This field must be no more than 1000 characters",
                },
              })}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" form="create-author-form">
            Add New
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
