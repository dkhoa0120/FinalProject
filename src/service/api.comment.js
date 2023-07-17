import { userAxios } from "./api.base";

export const getUserComment = (id) => {
  return userAxios.get(`/manga/${id}/comments`);
};

export const getUserChildComment = (id) => {
  return userAxios.get(`/MangaComment/${id}`);
};
