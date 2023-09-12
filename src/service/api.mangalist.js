import { baseAxios, getAuthorizedAxios } from "./api.base";

export const getMangaLists = (userId) => {
  return baseAxios.get(`users/${userId}/manga-lists`);
};

export const getOwnerMangaLists = (userId) => {
  return getAuthorizedAxios().get(`users/${userId}/manga-lists`);
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
