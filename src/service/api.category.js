import { getAuthorizeAxios } from "./api.base";
import qs from "qs";

export const getCategories = (filter) => {
  const search = filter?.search;
  const excludeDeleted = filter?.excludeDeleted;
  const page = filter?.page;
  const pageSize = filter?.pageSize;

  return getAuthorizeAxios().get("/manage/category", {
    params: { search, excludeDeleted, page, pageSize },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const createCategory = (data) => {
  return getAuthorizeAxios().post(`/manage/category`, data);
};

export const getCategoryByID = (id) => {
  return getAuthorizeAxios().get(`/manage/category/${id}`);
};

export const editCategory = (id, data) => {
  return getAuthorizeAxios().put(`/manage/category/${id}`, data);
};

export const deleteCategory = (id, undelete = false) => {
  return getAuthorizeAxios().delete(`/manage/category/${id}`, {
    params: { undelete },
  });
};
