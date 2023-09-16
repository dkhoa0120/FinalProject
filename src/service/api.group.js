import { baseAxios, getAuthorizedAxios } from "./api.base";
import qs from "qs";

export const getUploadGroup = (id) => {
  return baseAxios.get(`users/${id}/groups`);
};

export const getGroupInfo = (id) => {
  return baseAxios.get(`groups/${id}`);
};

export const getGroupMembers = (id) => {
  return baseAxios.get(`groups/${id}/members`);
};

export const getGroupMangaList = (groupId, filter) => {
  const page = filter?.page;

  return baseAxios.get(`groups/${groupId}/chaptersByManga`, {
    params: {
      page,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const postGroup = (formData) => {
  return getAuthorizedAxios().post(`groups`, formData);
};
