import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as listApi from "../../../service/api.mangaList";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useEffect } from "react";

export default function FollowedMangaList() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [mangaLists, setMangaLists] = useState();
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const privacy = [`Private`, `Public`];
  const privacyOptions = privacy.map((p) => ({
    value: p,
    label: p,
  }));

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
      if (key === "type") {
        formData.append(key, data[key].value);
      }
      formData.append(key, data[key]);
    }

    try {
      await listApi.postMangaList(formData);
      setShow(false);
      fetchMangaLists(userId);
      reset({
        name: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchMangaLists = async (id) => {
    try {
      if (user && userId === user?.id) {
        let res = await listApi.getOwnerMangaLists(id);
        setMangaLists(res.data);
      } else {
        let res = await listApi.getMangaLists(id);
        setMangaLists(res.data);
      }
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
    <Container fluid>
      <Row>
        {mangaLists ? (
          mangaLists.map((mangaList, index) => {
            return (
              <Col md={3} key={index}>
                <div className="manga-list">
                  {mangaList?.mangaCoverUrls.length > 0 ? (
                    <>
                      <img
                        style={{
                          width: "40%",
                          zIndex: "110",
                        }}
                        src={
                          mangaList?.mangaCoverUrls[0] ||
                          "/img/error/blankCover.png"
                        }
                        alt="mangaList's cover"
                      />
                      <img
                        style={{
                          width: "30%",
                          marginLeft: "-10px",
                          zIndex: "100",
                        }}
                        src={
                          mangaList?.mangaCoverUrls[1] ||
                          "/img/error/blankCover.png"
                        }
                        alt="mangaList's cover"
                      />
                      <img
                        style={{
                          width: "20%",
                          marginLeft: "-5px",
                          zIndex: "90",
                        }}
                        src={
                          mangaList?.mangaCoverUrls[2] ||
                          "/img/error/blankCover.png"
                        }
                        alt="mangaList's cover"
                      />
                    </>
                  ) : (
                    <div className="empty-list">Empty list</div>
                  )}
                  <div className="manga-list-info">
                    <i className="fa-solid fa-list-ul"></i>
                    <p className="manga-list-name text-limit-2">
                      {mangaList.name}
                    </p>
                    {mangaList.type === "Private" && (
                      <i className="fa-solid fa-lock"></i>
                    )}
                  </div>
                  <div
                    className="hover-overlay"
                    onClick={() => navigate(`/MangaList/${mangaList.id}`)}
                  >
                    <span>See more</span>
                  </div>
                </div>
              </Col>
            );
          })
        ) : (
          <p></p>
        )}
      </Row>
    </Container>
  );
}
