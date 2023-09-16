import { getAuthorizedAxios, baseAxios } from "./api.base";
import qs from "qs";

// mangas
export const getMangas = (filter) => {
  const search = filter?.search;
  const sortOption = filter?.sortOption;
  const excludeDeleted = filter?.excludeDeleted;
  const includedCategoryIds = filter?.includedCategoryIds;
  const excludedCategoryIds = filter?.excludedCategoryIds;
  const selectedLanguages = filter?.selectedLanguages;
  const selectedAuthorId = filter?.selectedAuthorId;
  const page = filter?.page;

  return baseAxios.get("mangas", {
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
  return baseAxios.get("mangas/trending");
};

export const getNewToYouMangas = () => {
  return getAuthorizedAxios().get(`mangas/new-to-you`);
};

export const getMangaById = (id) => {
  return baseAxios.get(`mangas/${id}`);
};

export const getMangaStats = (id) => {
  return baseAxios.get(`mangas/${id}/stats`);
};

export const getChapterByMangaId = (id, filter) => {
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 8;

  return baseAxios.get(`mangas/${id}/chapters`, {
    params: { page, pageSize },
  });
};

// manage/mangas
export const getMangaByIdForManage = (id) => {
  return getAuthorizedAxios().get(`manage/mangas/${id}`);
};

export const createManga = (formData) => {
  return getAuthorizedAxios().post("manage/mangas", formData);
};

export const editManga = (id, formData) => {
  return getAuthorizedAxios().put(`manage/mangas/${id}`, formData);
};

export const deleteManga = (id, undelete = false) => {
  return getAuthorizedAxios().delete(`manage/mangas/${id}`, {
    params: { undelete },
  });
};

// get chapter in profiles
export const getMangaInProfile = (uploaderId, filter) => {
  const page = filter?.page;

  return baseAxios.get(`uploader/${uploaderId}/chaptersByManga`, {
    params: {
      page,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};
