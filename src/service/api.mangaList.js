import { getAuthorizedAxios } from "./api.base";

export const getMangaLists = (userId, filter) => {
  const updatedAtCursor = filter?.updatedAtCursor;
  const checkedMangaId = filter?.checkedMangaId;
  return getAuthorizedAxios().get(`users/${userId}/manga-lists`, {
    params: { checkedMangaId, updatedAtCursor },
  });
};

export const getMangaList = (id, filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`manga-lists/${id}`, {
    params: {
      createdAtCursor,
    },
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

// Get mangas of manga list
export const getMangasOfList = (id, filter) => {
  const updatedAtCursor = filter?.updatedAtCursor;
  return getAuthorizedAxios().get(`manga-lists/${id}/mangas`, {
    params: {
      updatedAtCursor,
    },
  });
};
