import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import "./styles.css";
import { toast } from "react-toastify";
import CreateManga from "./components/CreateManga";
import EditManga from "./components/EditManga";
import DeleteManga from "./components/DeleteManga";
import Pagination from "../../../components/pagination";
import * as mangaApi from "../../../service/api.manga";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

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

  // Update the document title
  useEffect(() => {
    document.title = "Manage Manga - 3K Manga";
  }, []);

  // Fetch manga data
  useEffect(() => {
    getMangas(search, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const getMangas = async (search, page) => {
    try {
      const result = await mangaApi.getMangas({
        search,
        page,
        includeDeleted: true,
      });
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
    await mangaApi.getMangaByIdForManage(id).then((result) => {
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
      await mangaApi.deleteManga(id, true);
      toast.success("Manga has been restored");
      getMangas();
    } catch (error) {
      toast.error("Failed to delete restored");
    }
  };

  return (
    <Container fluid>
      <div className="manage-table">
        <Row>
          <Col xs={4} md={6}>
            <Button variant="success" onClick={() => setShownModal("create")}>
              <i className="fa-solid fa-circle-plus"></i> Create
            </Button>
          </Col>
          <Col xs={8} md={6}>
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
        &nbsp;
        <Table striped bordered hover responsive="sm">
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
                    <td style={{ width: "80px" }}>
                      <img
                        src={item.coverPath || "/img/error/coverNotFound.png"}
                        alt="cover"
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td className="manga-title-cell">{item.originalTitle}</td>
                    <td>{item.originalLanguage}</td>
                    <td>
                      <span className="text-limit-3">{item.description}</span>
                    </td>
                    <td style={{ width: "200px" }}>
                      {item.deletedAt != null ? (
                        <Button
                          variant="dark"
                          onClick={() => handleUndelete(item.id)}
                        >
                          <i className="fa-solid fa-rotate-left"></i>
                          <span className="hide-when-mobile"> Undelete</span>
                        </Button>
                      ) : (
                        <>
                          <Button
                            style={{ marginBottom: "5px" }}
                            onClick={() => handleEdit(item.id)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                            <span className="hide-when-mobile"> Edit</span>
                          </Button>
                          &nbsp;
                          <Button
                            style={{ marginBottom: "5px" }}
                            variant="danger"
                            onClick={() => handleDelete(item)}
                          >
                            <i className="fa-solid fa-trash"></i>
                            <span className="hide-when-mobile"> Delete</span>
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>
                  <SpinnerLoading />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Pagination
          totalPages={totalPages}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
      <CreateManga
        show={shownModal === "create"}
        handleClose={() => setShownModal(null)}
        search={search}
        page={page}
        getMangas={getMangas}
      />
      <EditManga
        show={shownModal === "edit"}
        handleClose={() => setShownModal(null)}
        search={search}
        page={page}
        dataEdit={dataEdit}
        getMangas={getMangas}
      />
      <DeleteManga
        show={shownModal === "delete"}
        handleClose={() => setShownModal(null)}
        search={search}
        page={page}
        dataEdit={dataEdit}
        getMangas={getMangas}
      />
    </Container>
  );
}
