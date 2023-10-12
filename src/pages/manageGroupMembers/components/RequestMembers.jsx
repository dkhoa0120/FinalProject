import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import PaginationNoParams from "../../../components/paginationNoParams";

import * as groupApi from "../../../service/api.group";
import { useCallback } from "react";

export default function RequestMembers({ groupId }) {
  const [search, setSearch] = useState(null);

  const [members, setMembers] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [groupDetails, setGroupDetails] = useState(null);
  const [roleOption, setRoleOption] = useState(null);

  const getGroupDetail = async (id) => {
    try {
      const result = await groupApi.getGroupInfo(id);
      document.title = `Manage Group - ${result.data.name} - 3K Manga`;
      setGroupDetails(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response);
      }
    }
  };

  const fetchGroupMembers = useCallback(
    async (groupId) => {
      try {
        const res = await groupApi.getMembersToManage(groupId, {
          search,
          roleOption,
          page,
        });
        setMembers(res.data.itemList);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.error();
        }
      }
    },
    [search, roleOption, page]
  );

  useEffect(() => {
    fetchGroupMembers(groupId);
    getGroupDetail(groupId);
  }, [fetchGroupMembers, groupId]);

  // Event handler for page change
  const handleChangeChapter = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <>
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members ? (
            members.map((member, index) => {
              return (
                <tr key={index}>
                  <td style={{ width: "100px" }}>
                    <Link to={`/profile/${member.id}`} className="card-link">
                      <img
                        className="group-avatar"
                        src={member.avatarPath || "/img/avatar/default.png"}
                        alt="avatar"
                      />
                    </Link>
                  </td>
                  <td style={{ width: "300px" }}>
                    <Link to={`/profile/${member.id}`} className="card-link">
                      <p
                        className="text-limit-2"
                        style={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        {member.name}
                      </p>
                    </Link>
                  </td>
                  <td style={{ width: "100px" }}>
                    <Button style={{ marginBottom: "5px" }}>
                      <i className="fa-solid fa-plus"></i>
                      <span className="hide-when-mobile"> Approve</span>
                    </Button>
                    &nbsp;
                    <Button variant="danger" style={{ marginBottom: "5px" }}>
                      <i className="fa-solid fa-minus"></i>
                      <span className="hide-when-mobile"> Deny</span>
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3}>
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <PaginationNoParams
          page={page}
          totalPages={totalPages}
          onPageChange={handleChangeChapter}
        />
      </div>
    </>
  );
}
