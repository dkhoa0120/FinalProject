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
  const page = filter?.page;
  const pageSize = filter?.pageSize;
  return getAuthorizedAxios().get(`followed-mangas`, {
    params: {
      page,
      pageSize,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const getFollowingUsers = () => {
  return getAuthorizedAxios().get(`followings`);
};

export const getFollowerUsers = () => {
  return getAuthorizedAxios().get(`followers`);
};
