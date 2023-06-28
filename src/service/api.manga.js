import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = process.env.REACT_APP_API_URL;
const userAxios = axios.create({
  baseURL: `${API_URL}/user`,
});
const getManageAxios = () =>
  axios.create({
    baseURL: `${API_URL}/manage`,
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });

// user/manga
export const getMangasForUser = (filter) => {
  const search = filter?.search || "";
  const sortOption = filter?.sortOption || 0;
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 12;

  return userAxios.get("/manga", {
    params: { search, sortOption, page, pageSize },
  });
};

export const getMangaByIdForUser = (id) => {
  return userAxios.get(`/manga/${id}`);
};

// manage/manga
export const getMangasForManage = (filter) => {
  const search = filter?.search || "";
  const excludeDeleted = filter?.excludeDeleted || false;
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 12;

  return getManageAxios().get("/manga", {
    params: { search, excludeDeleted, page, pageSize },
  });
};

export const getMangaByIdForManage = (id) => {
  return getManageAxios().get(`/manga/${id}`);
};

export const createManga = (formData) => {
  return getManageAxios().post("/manga", formData);
};

export const editManga = (id, formData) => {
  return getManageAxios().put(`/managa/${id}`, formData);
};

export const deleteManga = (id, undelete = false) => {
  return getManageAxios().delete(`/manage/${id}`, {
    params: { undelete },
  });
};
