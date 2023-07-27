import { baseAxios } from "./api.base";

export const getUserComment = (id, filter) => {
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 3;
  return baseAxios.get(`/mangas/${id}/comments`, {
    params: { page, pageSize },
  });
};

export const getUserChildComment = (id) => {
  return baseAxios.get(`/manga-comments/${id}/children`);
};
