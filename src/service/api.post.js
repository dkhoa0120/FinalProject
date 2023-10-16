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

export const createGroupPost = (groupId, formData) => {
  return getAuthorizedAxios().post(`/groups/${groupId}/posts`, formData);
};

export const getGroupPosts = (groupId, filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`/groups/${groupId}/posts`, {
    params: {
      createdAtCursor,
    },
  });
};

export const getMyFeeds = (filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`/my-feed`, {
    params: {
      createdAtCursor,
    },
  });
};
