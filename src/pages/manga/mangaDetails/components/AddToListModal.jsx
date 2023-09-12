import { Button, Form, Modal, ToastContainer } from "react-bootstrap";
import * as listApi from "../../../../service/api.mangalist";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddToListModal({
  show,
  setShow,
  handleShowForm,
  showForm,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const [mangaLists, setMangaLists] = useState();
  const [selectedId, setSelectedId] = useState();
  const [selectedName, setSelectedName] = useState();
  const [selectedType, setSelectedType] = useState();
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const privacy = [`Private`, `Public`];
  const privacyOptions = privacy.map((p) => ({
    value: p,
    label: p,
  }));
  const { mangaId } = useParams();

  const hanldeAddToList = async () => {
    const formData = new FormData();
    formData.append("name", selectedName);
    formData.append("type", selectedType);
    formData.append("addedMangaId", mangaId);
    try {
      await listApi.putMangaList(selectedId, formData);
      setShow(false);
      toast.success("A manga has been add to lists");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "type") {
        formData.append(key, data[key].value);
      }
      formData.append(key, data[key]);
    }

    try {
      await listApi.postMangaList(formData);
      fetchMangaLists(userId);
      reset({ name: "" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchMangaLists = async (id) => {
    try {
      let res = await listApi.getOwnerMangaLists(id);
      setMangaLists(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  useEffect(() => {
    fetchMangaLists(userId);
  }, [userId]);
  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add manga to...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Group className="mb-3">
                {mangaLists?.map((mangaList) => (
                  <Form.Check
                    type="radio"
                    name="mangaListSelection"
                    label={mangaList.name}
                    value={mangaList.id}
                    onChange={(e) => {
                      const selectedList = mangaLists.find(
                        (list) => list.id === e.target.value
                      );

                      if (selectedList) {
                        setSelectedId(selectedList.id);
                        setSelectedName(selectedList.name);
                        setSelectedType(selectedList.type);
                      } else {
                        console.log("Selected mangaList not found.");
                      }
                    }}
                  />
                ))}
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3">
              <i
                className="fa-solid fa-plus"
                onClick={handleShowForm}
                style={{ cursor: "pointer" }}
              ></i>{" "}
              {showForm ? "Close Form" : "Create a new manga list"}
            </Form.Group>
          </Form>
          {showForm && (
            <Form id="create-form" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>{" "}
                {errors.name && (
                  <i
                    title={errors.name.message}
                    className="fa-solid fa-circle-exclamation"
                    style={{ color: "red" }}
                  ></i>
                )}
                <Form.Control
                  name="Name"
                  defaultValue={null}
                  control={control}
                  rules={{ required: "This field is required" }}
                  {...register("name", {
                    required: "List name is required",
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Privacy</Form.Label>
                <Controller
                  name="type"
                  defaultValue={privacyOptions[0]}
                  control={control}
                  render={({ field }) => (
                    <Select {...field} options={privacyOptions} />
                  )}
                />
              </Form.Group>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button type="submit" form="create-form" variant="success">
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={hanldeAddToList}>
            Add to list
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
