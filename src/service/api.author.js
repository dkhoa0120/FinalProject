import { getManageAxios } from "./api.base";

export const getAuthors = (filter) => {
  const search = filter?.search;
  const excludeDeleted = filter?.excludeDeleted;
  const page = filter?.page;
  const pageSize = filter?.pageSize;

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
