import { baseAxios, getAuthorizedAxios } from "./api.base";

export const getMangaLists = (userId, filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return baseAxios.get(`users/${userId}/manga-lists`, {
    params: {
      createdAtCursor,
    },
  });
};

export const getOwnerMangaLists = (userId, filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  const checkedMangaId = filter?.checkedMangaId;
  return getAuthorizedAxios().get(`users/${userId}/manga-lists`, {
    params: { checkedMangaId, createdAtCursor },
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

export const getMangaList = (id, filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`manga-lists/${id}`, {
    params: {
      createdAtCursor,
    },
  });
};

export const getMangasOfList = (id, filter) => {
  const updatedAtCursor = filter?.updatedAtCursor;
  return getAuthorizedAxios().get(`manga-lists/${id}/mangas`, {
    params: {
      updatedAtCursor,
    },
  });
};

export const getFollowedList = (id, filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`manga-lists/${id}`, {
    params: {
      createdAtCursor,
    },
  });
};

//Followed Manga List

export const getFollowedLists = (filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get("followed-manga-lists", {
    params: {
      createdAtCursor,
    },
  });
};

export const postFollowedList = (id) => {
  return getAuthorizedAxios().post(`user/follow/manga-lists/${id}`);
};

export const deleteFollowedList = (id) => {
  return getAuthorizedAxios().delete(`user/follow/manga-lists/${id}`);
};
