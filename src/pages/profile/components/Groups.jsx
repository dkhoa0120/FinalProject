import { useEffect, useState, useContext } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as groupApi from "../../../service/api.group";
import { UserContext } from "../../../context/UserContext";
import { useForm } from "react-hook-form";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

export default function Groups() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const [loadingPost, setLoadingPost] = useState(false);
  const [outOfPost, setOutOfPost] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: {} });

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      let res = await groupApi.postGroup(formData);
      setShow(false);
      reset();
      navigate(`/groups/${res.data.id}/Uploads`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchGroups = async (id) => {
    try {
      let res = await groupApi.getUploadGroup(id);
      setGroups(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("404");
      }
    }
  };

  const handleSeeMoreGroups = async (userId, joinedAtCursor) => {
    try {
      const newGroups = await groupApi.getUploadGroup(userId, {
        joinedAtCursor,
      });
      setGroups([...groups, ...newGroups.data]);

      // Set outOfComment to disable loading more comment in scroll event below
      if (newGroups.data.length > 0) {
        setOutOfPost(false);
      } else {
        setOutOfPost(true);
      }
    } catch (error) {
      console.error("Error fetching more members:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if you've scrolled to the bottom
      if (
        window.innerHeight + Math.round(window.scrollY) >=
          document.body.offsetHeight &&
        groups.length > 0 &&
        !outOfPost
      ) {
        setLoadingPost(true);
        setTimeout(() => {
          handleSeeMoreGroups(userId, groups[groups.length - 1]?.userJoinedAt);
          setLoadingPost(false);
        }, 1000);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  useEffect(() => {
    fetchGroups(userId);
  }, [userId]);

  return (
    <>
      <Container fluid className="px-4">
        <Row>
          {user && user?.id === userId && (
            <Col md={3}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  className="create-group-button"
                  onClick={() => setShow(true)}
                >
                  <i className="fa-solid fa-plus"></i>
                </div>
                <div>Create new group</div>
              </div>
            </Col>
          )}
          {groups ? (
            groups.map((group, index) => {
              return (
                <Col md={3} key={index}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <Link
                      to={`/groups/${group.id}/Uploads`}
                      className="card-link"
                    >
                      <img
                        className="group-avatar"
                        src={group.avatarPath || "/img/avatar/defaultGroup.jpg"}
                        alt="group's cover"
                      ></img>
                    </Link>
                    <div className="group-info">
                      <Link
                        to={`/groups/${group.id}/Uploads`}
                        className="card-link"
                      >
                        <p className="text-limit-2">
                          <b>{group.name}</b>
                        </p>
                      </Link>
                      <p>
                        {group.isMangaGroup ? "Manga Group" : "Community Group"}
                      </p>
                      <p>
                        {group.memberNumber}{" "}
                        {group.memberNumber >= 2 ? "members" : "member"}
                      </p>
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <p></p>
          )}
        </Row>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create new group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                    required: "Group name is required",
                  })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Biography</Form.Label>{" "}
                {errors.name && (
                  <i
                    title={errors.biography.message}
                    className="fa-solid fa-circle-exclamation"
                    style={{ color: "red" }}
                  ></i>
                )}
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="Biography"
                  defaultValue={null}
                  control={control}
                  rules={{ required: "This field is required" }}
                  {...register("biography", {
                    required: "Biography is required",
                  })}
                />
              </Form.Group>
              <Form.Group className="d-flex align-items-center gap-2 mb-3">
                <Form.Check
                  name="IsMangaGroup"
                  type="checkbox"
                  label="Manga Group"
                  control={control}
                  rules={{ required: "This field is required" }}
                  {...register("isMangaGroup")}
                />
                <i
                  className="fa-regular fa-circle-question"
                  title="Set this will allow your group uploaders to upload chapter under your group name"
                ></i>
              </Form.Group>
            </Form>
            <div className="end-button">
              <Button type="submit" form="create-form" variant="success">
                Create
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
      {loadingPost && <SpinnerLoading />}
    </>
  );
}
