import { baseAxios, getAuthorizedAxios } from "./api.base";

export const getUploadGroup = (id) => {
  return baseAxios.get(`users/${id}/groups`);
};

export const getGroupInfo = (id) => {
  return baseAxios.get(`groups/${id}`);
};

export const postGroup = (formData) => {
  return getAuthorizedAxios().post(`groups`, formData);
};
