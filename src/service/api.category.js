import { getManageAxios } from "./api.base";
import qs from "qs";

export const getCategories = (filter) => {
  const search = filter?.search;
  const excludeDeleted = filter?.excludeDeleted;
  const page = filter?.page;
  const pageSize = filter?.pageSize;

  return getManageAxios().get("/category", {
    params: { search, excludeDeleted, page, pageSize },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const createCategory = (data) => {
  return getManageAxios().post(`/category`, data);
};

export const getCategoryByID = (id) => {
  return getManageAxios().get(`/category/${id}`);
};

export const editCategory = (id, data) => {
  return getManageAxios().put(`/category/${id}`, data);
};

export const deleteCategory = (id, undelete = false) => {
  return getManageAxios().delete(`/category/${id}`, {
    params: { undelete },
  });
};
