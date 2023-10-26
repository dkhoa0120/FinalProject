import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormSelect,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as reportApi from "../../../../service/api.report";

export default function ManageUserReports() {
  const [showBanModal, setShowBanModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  const status = searchParams.get("status") || "";
  const page = searchParams.get("page") || "1";

  console.log("report", reports);

  useEffect(() => {
    getUsersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const getUsersList = async () => {
    try {
      const result = await reportApi.getReports({ status, page });
      setReports(result.data.itemList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to another page
        navigate("/login");
      } else if (error.response && error.response.status === 404) {
        setReports([]);
        setTotalPages(0);
      }
    }
  };

  const putStatus = async (id, status) => {
    console.log("id", id);
    try {
      const formData = new FormData();
      formData.append("status", status);
      await reportApi.putReportStatus(id, formData);
      setReports((prevReports) => {
        return prevReports.map((r) => {
          if (r.id === id) {
            return {
              ...r,
              status,
            };
          }
          return r;
        });
      });
    } catch (error) {}
  };

  return (
    <>
      <Row>
        <Col xs={4}>
          <FormSelect
            value={status}
            onChange={(e) => {
              if (e.target.value === "All") {
                setSearchParams({ page: "1" });
              } else {
                setSearchParams({ status: e.target.value, page: "1" });
              }
            }}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            <option value="Omitted">Omitted</option>
          </FormSelect>
        </Col>
      </Row>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Reportee Name</th>
            <th>Reporter Name</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => {
              return (
                <tr key={report.id}>
                  <td style={{ width: "150px" }}>{report.reportee.name}</td>
                  <td style={{ width: "150px" }}>{report.reporter.name}</td>
                  <td>{report.reason}</td>
                  <td style={{ width: "150px" }}>
                    <Form.Select
                      value={report.status}
                      onChange={async (e) => {
                        await putStatus(report?.id, e.target.value);
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Omitted">Omitted</option>
                    </Form.Select>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>
                <div className="d-flex justify-content-center">
                  <span>There are no reports</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Report modal */}
      <Modal show={showBanModal} onHide={() => setShowBanModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ban User Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>To Date</b>
            </Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <div className="end-button">
            <Button variant="danger">Confirm Ban</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
