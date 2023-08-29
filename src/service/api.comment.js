import { baseAxios, getAuthorizedAxios } from "./api.base";

export const getComments = (type, typeId, filter) => {
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 6;
  return baseAxios.get(`${type}s/${typeId}/comments`, {
    params: { page, pageSize },
  });
};

export const getChildComments = (id) => {
  return baseAxios.get(`comments/${id}/children`);
};

export const postComment = (type, typeId, formData) => {
  return getAuthorizedAxios().post(`${type}s/${typeId}/comments`, formData);
};

export const putComment = (id, formData) => {
  return getAuthorizedAxios().put(`comments/${id}`, formData);
};

export const deleteComment = (id) => {
  return getAuthorizedAxios().delete(`comments/${id}`);
};

export const postReply = (id, formData) => {
  return getAuthorizedAxios().post(`comments/${id}/children`, formData);
};
