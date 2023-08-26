import { getAuthorizeAxios } from "./api.base";

export const getAuthors = (filter) => {
  const search = filter?.search;
  const excludeDeleted = filter?.excludeDeleted;
  const page = filter?.page;
  const pageSize = filter?.pageSize;

  return getAuthorizeAxios().get("/manage/author", {
    params: { search, excludeDeleted, page, pageSize },
  });
};

export const getAuthorByID = (id) => {
  return getAuthorizeAxios().get(`/manage/author/${id}`);
};

export const createAuthor = (data) => {
  return getAuthorizeAxios().post(`/manage/author`, data);
};

export const editAuthor = (id, data) => {
  return getAuthorizeAxios().put(`/manage/author/${id}`, data);
};

export const deleteAuthor = (id, undelete = false) => {
  return getAuthorizeAxios().delete(`/manage/author/${id}`, {
    params: { undelete },
  });
};
