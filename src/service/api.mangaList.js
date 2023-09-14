import { baseAxios, getAuthorizedAxios } from "./api.base";

export const getMangaLists = (userId) => {
  return baseAxios.get(`users/${userId}/manga-lists`);
};

export const getOwnerMangaLists = (userId, checkedMangaId) => {
  return getAuthorizedAxios().get(`users/${userId}/manga-lists`, {
    params: { checkedMangaId },
  });
};

export const postMangaList = (formData) => {
  return getAuthorizedAxios().post("manga-lists", formData);
};

export const putMangaList = (id, formData) => {
  return getAuthorizedAxios().put(`manga-lists/${id}`, formData);
};

export const deleteMangaList = (id) => {
  return getAuthorizedAxios().delete(`manga-lists/${id}`);
};

export const getMangaList = (id) => {
  return baseAxios.get(`manga-lists/${id}`);
};

export const getMangasOfList = (id) => {
  return baseAxios.get(`manga-lists/${id}/mangas`);
};

export const getFollowedList = (id) => {
  return getAuthorizedAxios().get(`manga-lists/${id}`);
};

//Followed Manga List

export const getFollowedLists = () => {
  return getAuthorizedAxios().get("followed-manga-lists");
};

export const postFollowedList = (id) => {
  return getAuthorizedAxios().post(`user/follow/manga-lists/${id}`);
};

export const deleteFollowedList = (id) => {
  return getAuthorizedAxios().delete(`user/follow/manga-lists/${id}`);
};
