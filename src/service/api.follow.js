import { getAuthorizedAxios } from "./api.base";
import qs from "qs";

export const getCurrentUserFollow = (type, id) => {
  return getAuthorizedAxios().get(`${type}s/${id}/my-follow`);
};

export const postFollow = (type, id) => {
  return getAuthorizedAxios().post(`${type}s/${id}/my-follow`, {});
};

export const deleteFollow = (type, id) => {
  return getAuthorizedAxios().delete(`${type}s/${id}/my-follow`);
};

export const getFollowedMangas = (filter) => {
  const updatedAtCursor = filter?.updatedAtCursor;
  return getAuthorizedAxios().get(`followed-mangas`, {
    params: {
      updatedAtCursor,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const getFollowingUsers = (filter) => {
  const followedAtCursor = filter?.followedAtCursor;
  return getAuthorizedAxios().get(`followings`, {
    params: {
      followedAtCursor,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const getFollowerUsers = (filter) => {
  const followedAtCursor = filter?.followedAtCursor;
  return getAuthorizedAxios().get(`followers`, {
    params: {
      followedAtCursor,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

// Followed Manga List
export const getFollowedLists = (filter) => {
  const updatedAtCursor = filter?.updatedAtCursor;
  return getAuthorizedAxios().get("followed-manga-lists", {
    params: {
      updatedAtCursor,
    },
  });
};

export const postFollowedList = (id) => {
  return getAuthorizedAxios().post(`manga-lists/${id}/my-follow`);
};

export const deleteFollowedList = (id) => {
  return getAuthorizedAxios().delete(`manga-lists/${id}/my-follow`);
};
