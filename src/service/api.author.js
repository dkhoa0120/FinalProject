import { baseAxios, getAuthorizedAxios } from "./api.base";

export const getAuthors = (filter) => {
  const search = filter?.search;
  const includeDeleted = filter?.includeDeleted;
  const page = filter?.page;
  const pageSize = filter?.pageSize;

  return baseAxios.get("manage/authors", {
    params: { search, includeDeleted, page, pageSize },
  });
};

export const getAuthorByID = (id) => {
  return baseAxios.get(`manage/authors/${id}`);
};

export const createAuthor = (data) => {
  return getAuthorizedAxios().post(`manage/authors`, data);
};

export const editAuthor = (id, data) => {
  return getAuthorizedAxios().put(`manage/authors/${id}`, data);
};

export const deleteAuthor = (id, undelete = false) => {
  return getAuthorizedAxios().delete(`manage/authors/${id}`, {
    params: { undelete },
  });
};
