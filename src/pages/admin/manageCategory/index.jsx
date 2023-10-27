import { useEffect, useState } from "react";
import { Col, Row, Form, Container, Button, Table } from "react-bootstrap";
import "./styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as categoryApi from "../../../service/api.category";
import { toast } from "react-toastify";
import Pagination from "../../../components/pagination";
import CreateCate from "./components/CreateCate";
import EditCate from "./components/EditCate";
import DeleteCate from "./components/DeleteCate";
import { SpinnerLoading } from "../../../utilities/spinnerLoading";

export default function ManageCategory() {
  // Component state variables
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  // Component state variables for modal controls
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  // Update the document title
  useEffect(() => {
    document.title = "Manage Category - 3K Manga";
  }, []);

  // Fetch manga data
  useEffect(() => {
    handleGetCategories(search, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const handleGetCategories = async (search, page) => {
    try {
      const result = await categoryApi.getCategories({
        search,
        page,
        includeDeleted: true,
      });
      setCategories(result.data.itemList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to another page
        navigate("/login");
      } else if (error.response && error.response.status === 404) {
        // Handle other errors
        setCategories([]);
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
  const handleEdit = async (id) => {
    setShowEdit(true);
    await categoryApi.getCategoryByID(id).then((result) => {
      setDataEdit(result.data);
    });
  };

  // Event handler for deleting cate
  const handleDelete = (categories) => {
    setDataEdit(categories);
    setShowDelete(true);
  };

  const handleUndelete = async (id) => {
    try {
      await categoryApi.deleteCategory(id, true);
      toast.success("Category has been restored");
      handleGetCategories();
    } catch (error) {
      toast.error("Failed to delete restored");
    }
  };

  return (
    <Container fluid>
      <div className="manage-table">
        <Row>
          <Col xs={4} md={6}>
            <Button variant="success" onClick={() => setShowCreate(true)}>
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
              <th>Category</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((item, index) => {
                return (
                  <tr key={index}>
                    <td style={{ width: "150px" }}>{item.name}</td>
                    <td className="cate-description-cell">
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
                <td colSpan={3}>
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
        <CreateCate
          show={showCreate}
          search={search}
          page={page}
          handleClose={() => setShowCreate(false)}
          getCategories={handleGetCategories}
        />
        <EditCate
          show={showEdit}
          handleClose={() => setShowEdit(false)}
          search={search}
          page={page}
          dataEdit={dataEdit}
          getCategories={handleGetCategories}
        />
        <DeleteCate
          show={showDelete}
          handleClose={() => setShowDelete(false)}
          dataEdit={dataEdit}
          search={search}
          page={page}
          getCategories={handleGetCategories}
        />
      </div>
    </Container>
  );
}
