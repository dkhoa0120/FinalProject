import { getAuthorizeAxios } from "./api.base";

export const getCurrentUserRating = (id) => {
  return getAuthorizeAxios().get(`/user/rating/mangas/${id}`);
};

export const postRating = (id, data) => {
  return getAuthorizeAxios().post(`/user/rating/mangas/${id}`, data);
};

export const putRating = (id, data) => {
  return getAuthorizeAxios().put(`/user/rating/mangas/${id}`, data);
};

export const deleteRating = (id) => {
  return getAuthorizeAxios().delete(`/user/rating/mangas/${id}`);
};
