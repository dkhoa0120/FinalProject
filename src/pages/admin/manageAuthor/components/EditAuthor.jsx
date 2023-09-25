import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as authorApi from "../../../../service/api.author";

export default function EditAuthor({
  dataEdit,
  show,
  handleClose,
  getAuthors,
  search,
  page,
}) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    if (dataEdit) {
      setValue("id", dataEdit.id);
      setValue("name", dataEdit.name);
      setValue("biography", dataEdit.biography);
    }
  }, [dataEdit, setValue]);

  const onSubmit = async (data) => {
    try {
      await authorApi.editAuthor(data.id, data);
      handleClose();
      getAuthors(search, page);
      toast.success("Author has been updated!");
    } catch (error) {
      toast.error("Somethings went wrong!");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Author</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="edit-author-form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>
              Name{" "}
              {errors.name && (
                <i
                  title={errors.name.message}
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "red" }}
                ></i>
              )}
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
              )}{" "}
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
          <Button variant="primary" type="submit" form="edit-author-form">
            Save Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
