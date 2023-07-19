import { userAxios } from "./api.base";

export const getUserComment = (id, filter) => {
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 3;
  return userAxios.get(`/manga/${id}/comments`, {
    params: { page, pageSize },
  });
};

export const getUserChildComment = (id) => {
  return userAxios.get(`/MangaComment/${id}`);
};
