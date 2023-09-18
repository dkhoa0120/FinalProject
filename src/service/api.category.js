import { baseAxios, getAuthorizedAxios } from "./api.base";
import qs from "qs";

export const getCategories = (filter) => {
  const search = filter?.search;
  const includeDeleted = filter?.includeDeleted;
  const page = filter?.page;
  const pageSize = filter?.pageSize;

  return baseAxios.get("manage/categories", {
    params: { search, includeDeleted, page, pageSize },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const getCategoryByID = (id) => {
  return getAuthorizedAxios().get(`manage/categories/${id}`);
};

export const createCategory = (data) => {
  return getAuthorizedAxios().post(`manage/categories`, data);
};

export const editCategory = (id, data) => {
  return getAuthorizedAxios().put(`manage/categories/${id}`, data);
};

export const deleteCategory = (id, undelete = false) => {
  return getAuthorizedAxios().delete(`manage/categories/${id}`, {
    params: { undelete },
  });
};
