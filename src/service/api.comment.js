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
  return baseAxios.get(`/manga-comments/${id}/children`);
};
