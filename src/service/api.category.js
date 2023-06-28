import { getManageAxios } from "./api.base";

export const getCategories = (filter) => {
  const search = filter?.search || "";
  const excludeDeleted = filter?.excludeDeleted || false;
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 12;

  return getManageAxios().get("/category", {
    params: { search, excludeDeleted, page, pageSize },
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
