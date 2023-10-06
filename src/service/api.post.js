import { getAuthorizedAxios } from "./api.base";

export const getPosts = (type, typeId, filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`${type}s/${typeId}/posts`, {
    params: {
      createdAtCursor,
    },
  });
};

export const createPost = (formData) => {
  return getAuthorizedAxios().post(`posts`, formData);
};

export const editPost = (postId, formData) => {
  return getAuthorizedAxios().put(`posts/${postId}`, formData);
};

export const deletePost = (postId) => {
  return getAuthorizedAxios().delete(`posts/${postId}`);
};
