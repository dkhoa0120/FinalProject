import { getAuthorizedAxios, baseAxios } from "./api.base";

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

export const uploadChapter = (formData) => {
  return getAuthorizedAxios().post(`chapters`, formData);
};

export const getChapterOfUploader = (id, filter) => {
  const search = filter?.search;
  const page = filter?.page;

  return getAuthorizedAxios().get(`uploader/${id}/chapters`, {
    params: {
      search,
      page,
    },
  });
};
