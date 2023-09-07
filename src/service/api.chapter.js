import { getAuthorizedAxios, baseAxios } from "./api.base";
import qs from "qs";

export const getChapter = (id) => {
  return baseAxios.get(`chapters/${id}`);
};

export const getRelatedChapters = (id) => {
  return baseAxios.get(`chapters/${id}/related-chapters`);
};

//Upload chapter

export const getUploadGroup = () => {
  return getAuthorizedAxios().get("users/me/groups");
};

export const uploadChapter = (mangaId, formData) => {
  return getAuthorizedAxios().post(`mangas/${mangaId}/chapters`, formData);
};

export const updateChapter = (chapterId, formData) => {
  return getAuthorizedAxios().put(`chapters/${chapterId}`, formData);
};

export const deleteChapter = (chapterId, undelete = false) => {
  return getAuthorizedAxios().delete(`chapters/${chapterId}`, {
    params: { undelete },
  });
};

export const getChapterOfUploader = (id, filter) => {
  const search = filter?.search;
  const page = filter?.page;
  const excludeDeleted = filter?.excludeDeleted;

  return getAuthorizedAxios().get(`uploader/${id}/chapters`, {
    params: {
      search,
      page,
      excludeDeleted,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};
