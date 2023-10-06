import { getAuthorizedAxios } from "./api.base";

export const createPost = (formData) => {
  return getAuthorizedAxios().post(`posts`, formData);
};

export const getPosts = (userId, filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`users/${userId}/posts`, {
    params: {
      createdAtCursor,
    },
  });
};

export const editPost = (id, formData) => {
  return getAuthorizedAxios().put(`posts/${id}`, formData);
};

export const deletePost = (id) => {
  return getAuthorizedAxios().delete(`posts/${id}`);
};
