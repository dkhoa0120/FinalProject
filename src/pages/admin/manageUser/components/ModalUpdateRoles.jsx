import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import * as userApi from "../../../../service/api.user";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

export default function ModalUpdateRoles({
  dataEdit,
  show,
  handleClose,
  getUsers,
}) {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (dataEdit) {
      setValue("id", dataEdit.id);
      setValue("name", dataEdit.name);
      setValue(
        "roles",
        dataEdit.roles.map((r) => ({ value: r, label: r }))
      );
    }
  }, [dataEdit, setValue]);

  const onSubmit = async (data) => {
    try {
      await userApi.updateRoles(
        data.id,
        data.roles.map((r) => r.value)
      );
      getUsers();
      handleClose();
      toast.success("User's roles have been updated");
    } catch (error) {
      toast.error("Somethings went wrong!");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Roles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="update-roles-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Form.Label>User Id</Form.Label>
              <Form.Control disabled type="text" {...register("id")} />
            </div>
            <br />
            <div>
              <Form.Label>User Name</Form.Label>
              <Form.Control disabled type="text" {...register("name")} />
            </div>
            <br />
            <div>
              <Form.Label>
                Roles{" "}
                {errors.roles && (
                  <i
                    title={errors.roles.message}
                    className="fa-solid fa-circle-exclamation"
                    style={{ color: "red" }}
                  ></i>
                )}
              </Form.Label>
              <Controller
                name="roles"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { value: "User", label: "User" },
                      { value: "Uploader", label: "Uploader" },
                      { value: "Manager", label: "Manager" },
                      { value: "Admin", label: "Admin" },
                    ]}
                    isMulti
                  />
                )}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" form="update-roles-form">
            Confirm Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
