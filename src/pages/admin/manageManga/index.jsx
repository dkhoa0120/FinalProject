import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Form, Image, Row, Table } from "react-bootstrap";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import CreateManga from "./components/CreateManga";
import EditManga from "./components/EditManga";
import DeleteManga from "./components/DeleteManga";
import Pagination from "../../../components/pagination";
import {
  deleteManga,
  getMangaByIdForManage,
  getMangasForManage,
} from "../../../service/api.manga";

export default function ManageManga() {
  // Component state variables
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mangas, setMangas] = useState(null);
  const [totalPages, setTotalPages] = useState();

  // Component state variables for modal controls
  const [shownModal, setShownModal] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);

  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  // Fetch manga data
  useEffect(() => {
    getMangas(search, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const getMangas = async (search, page) => {
    try {
      const result = await getMangasForManage({ search, page });
      setMangas(result.data.itemList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else if (error.response && error.response.status === 404) {
        setMangas(null);
        setTotalPages(0);
      }
    }
  };

  // Event handler for search manga
  const handleSearch = (e) => {
    const search = e.target.value;
    if (search) {
      setSearchParams({ search, page: 1 });
    } else {
      setSearchParams({ page: 1 });
    }
  };

  // Event handler for editing manga
  const handleEdit = async (id) => {
    await getMangaByIdForManage(id).then((result) => {
      setDataEdit(result.data);
    });
    setShownModal("edit");
  };

  // Event handler for deleting manga
  const handleDelete = (manga) => {
    setDataEdit(manga);
    setShownModal("delete");
  };

  // Event handler for undeleting manga
  const handleUndelete = async (id) => {
    try {
      await deleteManga(id, true);
      toast.success("Manga has been restored", {
        theme: "dark",
      });
      getMangas();
    } catch (error) {
      toast.error("Failed to delete restored");
    }
  };

  return (
    <div className="manage-manga">
      <ToastContainer />
      <Row>
        <Col>
          <Button variant="success" onClick={() => setShownModal("create")}>
            <i className="fa-solid fa-circle-plus"></i> Create
          </Button>
        </Col>
        <Col>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={handleSearch}
          />
        </Col>
      </Row>
      <div className="manage-table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Original Title</th>
              <th>Language</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mangas ? (
              mangas.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Image
                        src={item.coverPath || "/img/error/coverNotFound.png"}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td className="manga-title-cell">{item.originalTitle}</td>
                    <td>{item.originalLanguage}</td>
                    <td className="manga-description-cell">
                      <span className="text-limit-3">{item.description}</span>
                    </td>
                    <td colSpan={2}>
                      {item.deletedAt != null ? (
                        <Button
                          variant="dark"
                          onClick={() => handleUndelete(item.id)}
                        >
                          <i className="fa-solid fa-rotate-left"></i> Undelete
                        </Button>
                      ) : (
                        <>
                          <Button onClick={() => handleEdit(item.id)}>
                            <i className="fa-solid fa-pen-to-square"></i> Edit
                          </Button>
                          &nbsp;
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(item)}
                          >
                            <i className="fa-solid fa-trash"></i> Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center">
                <td colSpan={5}>No DATA found</td>
              </tr>
            )}
          </tbody>
        </Table>
        &nbsp;
        <Pagination
          totalPages={totalPages}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      <CreateManga
        show={shownModal === "create"}
        handleClose={() => setShownModal(null)}
        getMangas={getMangas}
      />
      <EditManga
        show={shownModal === "edit"}
        handleClose={() => setShownModal(null)}
        dataEdit={dataEdit}
        getMangas={getMangas}
      />
      <DeleteManga
        show={shownModal === "delete"}
        handleClose={() => setShownModal(null)}
        dataEdit={dataEdit}
        getMangas={getMangas}
      />
    </div>
  );
}
