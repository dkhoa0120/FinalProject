import { getAuthorizedAxios, baseAxios } from "./api.base";

export const createPost = (formData) => {
  return getAuthorizedAxios().post(`posts`, formData);
};

export const getPosts = (userId) => {
  return baseAxios.get(`users/${userId}/posts`);
};
