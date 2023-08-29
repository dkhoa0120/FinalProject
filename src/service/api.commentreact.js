import { getAuthorizedAxios } from "./api.base";

export const getUserReactComment = (id) => {
  return getAuthorizedAxios().get(`/user/react/comments/${id}`);
};

export const postReactComment = (id, data) => {
  return getAuthorizedAxios().post(`/user/react/comments/${id}`, data);
};

export const putReactComment = (id, data) => {
  return getAuthorizedAxios().put(`/user/react/comments/${id}`, data);
};

export const deleteReactComment = (id) => {
  return getAuthorizedAxios().delete(`/user/react/comments/${id}`);
};
