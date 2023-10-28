import { useEffect, useState } from "react";
import { Col, Form, FormSelect, Row, Table } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as reportApi from "../../../../service/api.report";
import Pagination from "../../../../components/pagination";

export default function ManageUserReports() {
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  const status = searchParams.get("status") || "";
  const page = searchParams.get("page") || "1";

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
        <Col xs={12} md={4}>
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
      &nbsp;
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
                  <td style={{ width: "200px" }}>{report.reportee.name}</td>
                  <td style={{ width: "200px" }}>{report.reporter.name}</td>
                  <td style={{ wordBreak: "break-word" }}>{report.reason}</td>
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
                <div className="content-center">
                  <span>There are no reports</span>
                </div>
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
    </>
  );
}
