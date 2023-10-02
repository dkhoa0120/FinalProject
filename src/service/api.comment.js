import { baseAxios, getAuthorizedAxios } from "./api.base";
import qs from "qs";

export const getComments = (type, typeId, filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return baseAxios.get(`${type}s/${typeId}/comments`, {
    params: {
      createdAtCursor,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
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
