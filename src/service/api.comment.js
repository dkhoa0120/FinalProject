import { baseAxios } from "./api.base";
import Cookies from "universal-cookie";

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
  return baseAxios.post(`/${type}s/${typeId}/comments`, formData, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const putComment = (id, formData) => {
  return baseAxios.put(`/comments/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const deleteComment = (id) => {
  return baseAxios.delete(`/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const postReply = (id, formData) => {
  return baseAxios.post(`/comments/${id}/children`, formData, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};
