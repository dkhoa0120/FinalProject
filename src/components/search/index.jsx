import React, { useState } from "react";
import "./styles.css";
import { Button, Image, Modal, Nav } from "react-bootstrap";
import * as mangaApi from "../../service/api.manga";
import * as userApi from "../../service/api.account";
import * as groupApi from "../../service/api.group";
import { Link } from "react-router-dom";

export default function SearchBar({ placeholder }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchMangas, setSearchMangas] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchGroups, setSearchGroups] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const fetchMangas = async (search) => {
    const response = await mangaApi.getMangas({ search });
    return response.data;
  };

  const fetchUsers = async (search) => {
    const response = await userApi.getUsers({ search });
    return response.data;
  };

  const fetchGroups = async (search) => {
    const response = await groupApi.getGroups({ search });
    return response.data;
  };

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    if (searchWord === "") {
      setSearchMangas([]);
      setSearchUsers([]);
      setSearchGroups([]);
    } else {
      try {
        const mangaData = await fetchMangas(searchWord);
        setSearchMangas(mangaData.itemList);
        const userData = await fetchUsers(searchWord);
        setSearchUsers(userData);
        const groupData = await fetchGroups(searchWord);
        setSearchGroups(groupData);
      } catch (error) {
        setSearchUsers([]);
        setSearchMangas([]);
        setSearchGroups([]);
      }
    }
  };

  const clearInput = () => {
    setSearchMangas([]);
    setSearchUsers([]);
    setSearchGroups([]);
    setWordEntered("");
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <span className="d-none d-md-inline"> Search</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="search">
            <div className="searchInputs">
              <input
                type="text"
                placeholder={placeholder}
                value={wordEntered}
                onChange={handleFilter}
                autoFocus
              />
              {wordEntered.length > 0 ? (
                <i
                  className="fa-solid fa-delete-left icon-delete"
                  onClick={clearInput}
                ></i>
              ) : (
                <p></p>
              )}
            </div>
            {searchMangas.length !== 0 && (
              <div className="item-list">
                <p className="search-title"> Mangas</p>
                {searchMangas.slice(0, 5).map((value) => {
                  return (
                    <React.Fragment key={value.id}>
                      <Nav className="search-info">
                        <Link
                          onClick={() => {
                            clearInput();
                            handleClose();
                          }}
                          to={`/mangas/${value.id}`}
                          className="item card-link"
                        >
                          <Image
                            style={{ height: "100%" }}
                            src={
                              value.coverPath || "/img/error/coverNotFound.png"
                            }
                          />
                          <span>{value.originalTitle} </span>
                        </Link>
                      </Nav>
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {searchUsers.length !== 0 && (
              <div className="item-list">
                <p className="search-title"> Users</p>
                {searchUsers.slice(0, 5).map((value) => {
                  return (
                    <React.Fragment key={value.id}>
                      <Nav className="search-info">
                        <Link
                          onClick={() => {
                            clearInput();
                            handleClose();
                          }}
                          to={`/profile/${value.id}/Uploads`}
                          className="item card-link"
                        >
                          <Image
                            style={{
                              height: "50px",
                              width: "50px",
                              borderRadius: "50%",
                            }}
                            src={value.avatarPath || "/img/avatar/default.png"}
                          />
                          <span>{value.name} </span>
                        </Link>
                      </Nav>
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {searchGroups.length !== 0 && (
              <div className="item-list">
                <p className="search-title"> Groups</p>
                {searchGroups.slice(0, 5).map((value) => {
                  return (
                    <React.Fragment key={value.id}>
                      <Nav className="search-info">
                        <Link
                          onClick={() => {
                            clearInput();
                            handleClose();
                          }}
                          to={`/groups/${value.id}/Uploads`}
                          className="item card-link"
                        >
                          <Image
                            style={{
                              height: "50px",
                              width: "50px",
                              borderRadius: "50%",
                            }}
                            src={
                              value.avatarPath || "/img/avatar/defaultGroup.jpg"
                            }
                          />
                          <span>{value.name} </span>
                        </Link>
                      </Nav>
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
