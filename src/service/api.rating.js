import { getAuthorizedAxios } from "./api.base";

export const getCurrentUserRating = (id) => {
  return getAuthorizedAxios().get(`mangas/${id}/my-rating`);
};

export const putRating = (id, data) => {
  return getAuthorizedAxios().put(`mangas/${id}/my-rating`, data);
};

export const deleteRating = (id) => {
  return getAuthorizedAxios().delete(`mangas/${id}/my-rating`);
};
