import { getAuthorizedAxios } from "./api.base";

// react comments

export const getUserReactComment = (id) => {
  return getAuthorizedAxios().get(`comments/${id}/my-react`);
};

export const putReactComment = (id, data) => {
  return getAuthorizedAxios().put(`comments/${id}/my-react`, data);
};

export const deleteReactComment = (id) => {
  return getAuthorizedAxios().delete(`comments/${id}/my-react`);
};

// react posts

export const getUserReactPost = (id) => {
  return getAuthorizedAxios().get(`posts/${id}/my-react`);
};

export const putReactPost = (id, data) => {
  return getAuthorizedAxios().put(`posts/${id}/my-react`, data);
};

export const deleteReactPost = (id) => {
  return getAuthorizedAxios().delete(`posts/${id}/my-react`);
};
