import { baseAxios, getAuthorizeAxios } from "./api.base";

export const getComments = (type, typeId, filter) => {
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 6;
  return baseAxios.get(`/${type}s/${typeId}/comments`, {
    params: { page, pageSize },
  });
};

export const getChildComments = (id) => {
  return baseAxios.get(`/comments/${id}/children`);
};

export const postComment = (type, typeId, formData) => {
  return getAuthorizeAxios().post(`/${type}s/${typeId}/comments`, formData)
};

export const putComment = (id, formData) => {
  return getAuthorizeAxios().put(`/comments/${id}`, formData);
};

export const deleteComment = (id) => {
  return getAuthorizeAxios().delete(`/comments/${id}`);
};

export const postReply = (id, formData) => {
  return getAuthorizeAxios().post(`/comments/${id}/children`, formData);
};
