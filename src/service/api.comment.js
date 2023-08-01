import { baseAxios } from "./api.base";
import Cookies from "universal-cookie";

export const getUserComment = (id, filter) => {
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 6;
  return baseAxios.get(`/mangas/${id}/comments`, {
    params: { page, pageSize },
  });
};

export const getUserChildComment = (id) => {
  return baseAxios.get(`/comments/${id}/children`);
};

export const postComment = (id, formData) => {
  return baseAxios.post(`/mangas/${id}/comments`, formData, {
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
