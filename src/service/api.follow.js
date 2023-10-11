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
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`followings`, {
    params: {
      createdAtCursor,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const getFollowerUsers = (filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`followers`, {
    params: {
      createdAtCursor,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};
