import { baseAxios, getAuthorizedAxios } from "./api.base";
import qs from "qs";

export const getCategories = (filter) => {
  const search = filter?.search;
  const excludeDeleted = filter?.excludeDeleted;
  const page = filter?.page;
  const pageSize = filter?.pageSize;

  return baseAxios.get("/manage/category", {
    params: { search, excludeDeleted, page, pageSize },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const getCategoryByID = (id) => {
  return getAuthorizedAxios().get(`/manage/category/${id}`);
};

export const createCategory = (data) => {
  return getAuthorizedAxios().post(`/manage/category`, data);
};

export const editCategory = (id, data) => {
  return getAuthorizedAxios().put(`/manage/category/${id}`, data);
};

export const deleteCategory = (id, undelete = false) => {
  return getAuthorizedAxios().delete(`/manage/category/${id}`, {
    params: { undelete },
  });
};
