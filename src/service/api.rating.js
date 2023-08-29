import { getAuthorizedAxios } from "./api.base";

export const getCurrentUserRating = (id) => {
  return getAuthorizedAxios().get(`user/rating/mangas/${id}`);
};

export const postRating = (id, data) => {
  return getAuthorizedAxios().post(`user/rating/mangas/${id}`, data);
};

export const putRating = (id, data) => {
  return getAuthorizedAxios().put(`user/rating/mangas/${id}`, data);
};

export const deleteRating = (id) => {
  return getAuthorizedAxios().delete(`user/rating/mangas/${id}`);
};
