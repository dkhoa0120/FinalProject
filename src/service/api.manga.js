import { userAxios, getManageAxios } from "./api.base";

// user/manga
export const getMangasForUser = (filter) => {
  const search = filter?.search || "";
  const sortOption = filter?.sortOption || 0;
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 1;

  return userAxios.get("/manga", {
    params: { search, sortOption, page, pageSize },
  });
};

export const getMangaByIdForUser = (id) => {
  return userAxios.get(`/manga/${id}`);
};

export const getChapterByMangaIdForUser = (id, filter) => {
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 3;

  return userAxios.get(`/manga/${id}/chapters`, {
    params: { page, pageSize },
  });
};
// manage/manga
export const getMangasForManage = (filter) => {
  const search = filter?.search || "";
  const excludeDeleted = filter?.excludeDeleted || false;
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 1;

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
  return getManageAxios().put(`/manga/${id}`, formData);
};

export const deleteManga = (id, undelete = false) => {
  return getManageAxios().delete(`/manga/${id}`, {
    params: { undelete },
  });
};
