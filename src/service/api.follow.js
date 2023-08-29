import { getAuthorizedAxios } from "./api.base";

export const getCurrentUserFollow = (id) => {
  return getAuthorizedAxios().get(`/user/follow/mangas/${id}`);
};

export const postFollow = (id) => {
  return getAuthorizedAxios().post(`/user/follow/mangas/${id}`, {});
};

export const deleteFollow = (id) => {
  return getAuthorizedAxios().delete(`/user/follow/mangas/${id}`);
};
