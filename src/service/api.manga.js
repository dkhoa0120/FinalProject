import { getAuthorizeAxios, baseAxios } from "./api.base";
import qs from "qs";

// user/manga
export const getMangas = (filter) => {
  const search = filter?.search;
  const sortOption = filter?.sortOption;
  const excludeDeleted = filter?.excludeDeleted;
  const includedCategoryIds = filter?.includedCategoryIds;
  const excludedCategoryIds = filter?.excludedCategoryIds;
  const selectedLanguages = filter?.selectedLanguages;
  const selectedAuthorId = filter?.selectedAuthorId;
  const page = filter?.page;

  return baseAxios.get("/mangas", {
    params: {
      search,
      sortOption,
      excludeDeleted,
      includedCategoryIds,
      excludedCategoryIds,
      selectedLanguages,
      selectedAuthorId,
      page,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const getTrendingMangas = () => {
  return baseAxios.get("/mangas/trending");
};

export const getNewToYouMangas = () => {
  return getAuthorizeAxios().get(`/mangas/new-to-you`);
};

export const getMangaById = (id) => {
  return baseAxios.get(`/mangas/${id}`);
};

export const getChapterByMangaId = (id, filter) => {
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 8;

  return baseAxios.get(`/mangas/${id}/chapters`, {
    params: { page, pageSize },
  });
};

// manage/manga
export const getMangaByIdForManage = (id) => {
  return getAuthorizeAxios().get(`/manage/manga/${id}`);
};

export const createManga = (formData) => {
  return getAuthorizeAxios().post("/manage/manga", formData);
};

export const editManga = (id, formData) => {
  return getAuthorizeAxios().put(`/manage/manga/${id}`, formData);
};

export const deleteManga = (id, undelete = false) => {
  return getAuthorizeAxios().delete(`/manage/manga/${id}`, {
    params: { undelete },
  });
};
