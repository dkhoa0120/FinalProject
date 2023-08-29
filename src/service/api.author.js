import { baseAxios, getAuthorizedAxios } from "./api.base";

export const getAuthors = (filter) => {
  const search = filter?.search;
  const excludeDeleted = filter?.excludeDeleted;
  const page = filter?.page;
  const pageSize = filter?.pageSize;

  return baseAxios.get("manage/author", {
    params: { search, excludeDeleted, page, pageSize },
  });
};

export const getAuthorByID = (id) => {
  return baseAxios.get(`manage/author/${id}`);
};

export const createAuthor = (data) => {
  return getAuthorizedAxios().post(`manage/author`, data);
};

export const editAuthor = (id, data) => {
  return getAuthorizedAxios().put(`manage/author/${id}`, data);
};

export const deleteAuthor = (id, undelete = false) => {
  return getAuthorizedAxios().delete(`manage/author/${id}`, {
    params: { undelete },
  });
};
