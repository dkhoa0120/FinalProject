import { getAuthorizeAxios } from "./api.base";

export const getUserReactComment = (id) => {
  return getAuthorizeAxios().get(`/user/react/comments/${id}`);
};

export const postReactComment = (id, data) => {
  return getAuthorizeAxios().post(`/user/react/comments/${id}`, data);
};

export const putReactComment = (id, data) => {
  return getAuthorizeAxios().put(`/user/react/comments/${id}`, data);
};

export const deleteReactComment = (id) => {
  return getAuthorizeAxios().delete(`/user/react/comments/${id}`);
};
