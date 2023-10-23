import { Button, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as listApi from "../../../../service/api.mangaList";

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
  const { user } = useContext(UserContext);
  const userId = user?.id;
  const privacy = [`Private`, `Public`];
  const privacyOptions = privacy.map((p) => ({
    value: p,
    label: p,
  }));
  const { mangaId } = useParams();

  // Add manga to a list
  const handleAddToList = async (selectedId, selectedName, selectedType) => {
    const formData = new FormData();
    formData.append("name", selectedName);
    formData.append("type", selectedType);
    formData.append("addedMangaId", mangaId);
    try {
      await listApi.putMangaList(selectedId, formData);
      toast.success("A manga has been add to lists");

      // Update state for checkbox
      var nextMangaLists = mangaLists.map((m) => {
        if (m.id === selectedId) {
          return { ...m, alreadyAdded: true };
        }
        return { ...m };
      });
      setMangaLists(nextMangaLists);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in!");
      }
      console.log(error);
    }
  };

  // Remove manga form a list
  const handleRemoveInList = async (selectedId, selectedName, selectedType) => {
    const formData = new FormData();
    formData.append("name", selectedName);
    formData.append("type", selectedType);
    formData.append("removedMangaId", mangaId);
    try {
      await listApi.putMangaList(selectedId, formData);
      toast.success("A manga has been removed");

      // Update state for checkbox
      var nextMangaLists = mangaLists.map((m) => {
        if (m.id === selectedId) {
          return { ...m, alreadyAdded: false };
        }
        return { ...m };
      });
      setMangaLists(nextMangaLists);
    } catch (error) {
      console.log(error);
    }
  };

  // Create a list

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
      if (error.response && error.response.status === 401) {
        toast.error("Please sign in!");
      }
      console.log(error.message);
    }
  };

  const fetchMangaLists = async (id) => {
    try {
      let res = await listApi.getMangaLists(id, {
        checkedMangaId: mangaId,
      });
      setMangaLists(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  useEffect(() => {
    fetchMangaLists(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          fetchMangaLists(userId);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add manga to...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              {mangaLists?.map((mangaList) => (
                <Form.Check
                  id={`chk-${mangaList.id}`}
                  key={mangaList.id}
                  type="checkbox"
                  name="mangaListSelection"
                  label={mangaList.name}
                  checked={mangaList.alreadyAdded}
                  onClick={(e) => {
                    const selectedList = mangaLists.find(
                      (list) => list.id === mangaList.id
                    );
                    if (selectedList) {
                      if (e.target.checked) {
                        handleAddToList(
                          selectedList.id,
                          selectedList.name,
                          selectedList.type
                        );
                      } else {
                        handleRemoveInList(
                          selectedList.id,
                          selectedList.name,
                          selectedList.type
                        );
                      }
                    } else {
                      console.log("Selected mangaList not found.");
                    }
                  }}
                />
              ))}
            </Form.Group>
            <Form.Group
              onClick={handleShowForm}
              style={{ cursor: "pointer", width: "max-content" }}
            >
              {!showForm ? (
                <>
                  <i className="fa-solid fa-plus"></i>{" "}
                  <span>Create a new MangaList</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-minus"></i> <span>Close Form</span>
                </>
              )}
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
              <div className="end-button">
                <Button type="submit" form="create-form" variant="success">
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
