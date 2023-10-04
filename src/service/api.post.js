import { getAuthorizedAxios, baseAxios } from "./api.base";

export const createPost = (formData) => {
  return getAuthorizedAxios().post(`posts`, formData);
};

export const getPosts = (userId) => {
  return getAuthorizedAxios().get(`users/${userId}/posts`);
};
