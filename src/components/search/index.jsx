import React, { useState } from "react";
import "./styles.css";
import { Button, Image, Modal, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getMangaForUI } from "../../service/Data.service";

function SearchBar({ placeholder }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getData(wordEntered);
  }, [wordEntered]);

  const getData = async (search) => {
    await getMangaForUI(search).then((result) => {
      setData(result.data);
    });
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      const originalTitle = value.originalTitle
        ? value.originalTitle.toLowerCase()
        : "";
      return originalTitle.includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        <i className="fa-solid fa-magnifying-glass"></i>
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
              />
              {filteredData.length === 0 ? (
                <p></p>
              ) : (
                <Button variant="outline-dark" onClick={clearInput}>
                  <i className="fa-solid fa-xmark"></i>
                </Button>
              )}
            </div>
            {filteredData.length !== 0 && (
              <div className="dataResult">
                {filteredData.slice(0, 15).map((value, key) => {
                  return (
                    <React.Fragment key={value.id}>
                      <Nav.Link
                        href={`/Manga/${value.id}`}
                        className="dataItem"
                      >
                        <Image
                          style={{ height: "60px", width: "40px" }}
                          src={value.coverPath}
                        />
                        <p>{value.originalTitle} </p>
                      </Nav.Link>
                      <hr />
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

export default SearchBar;
