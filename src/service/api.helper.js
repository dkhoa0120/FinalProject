import { baseAxios } from "./api.base";

export const getLanguage = () => {
  return baseAxios.get("helper/language");
};

export const getUploadGroup = (id) => {
  return baseAxios.get(`users/${id}/groups`);
};
