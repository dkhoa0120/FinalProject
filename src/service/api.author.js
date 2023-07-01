import { getManageAxios } from "./api.base";

export const getAuthors = (filter) => {
  const search = filter?.search || "";
  const excludeDeleted = filter?.excludeDeleted || false;
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 12;

  return getManageAxios().get("/author", {
    params: { search, excludeDeleted, page, pageSize },
  });
};

export const getAuthorByID = (id) => {
  return getManageAxios().get(`/author/${id}`);
};

export const createAuthor = (data) => {
  return getManageAxios().post(`/author`, data);
};

export const editAuthor = (id, data) => {
  return getManageAxios().put(`/author/${id}`, data);
};

export const deleteAuthor = (id, undelete = false) => {
  return getManageAxios().delete(`/author/${id}`, {
    params: { undelete },
  });
};
