import React, { useState } from "react";
import "./styles.css";
import { Button, Image, Modal, Nav } from "react-bootstrap";
import { getMangaForSearch } from "../../service/Data.service";

function SearchBar({ placeholder }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const getData = async (search) => {
    const response = await getMangaForSearch(search);
    return response.data;
  };

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      try {
        const mangaData = await getData(searchWord);
        setFilteredData(mangaData);
      } catch (error) {
        console.error("Error fetching manga data:", error);
        setFilteredData([]);
      }
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
                {filteredData.slice(0, 10).map((value, key) => {
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
