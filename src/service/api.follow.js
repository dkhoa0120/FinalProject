import { getAuthorizedAxios } from "./api.base";

export const getCurrentUserFollow = (id) => {
  return getAuthorizedAxios().get(`mangas/${id}/my-follow`);
};

export const postFollow = (id) => {
  return getAuthorizedAxios().post(`mangas/${id}/my-follow`, {});
};

export const deleteFollow = (id) => {
  return getAuthorizedAxios().delete(`mangas/${id}/my-follow`);
};
