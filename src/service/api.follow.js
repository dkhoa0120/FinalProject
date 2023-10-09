import { getAuthorizedAxios } from "./api.base";
import qs from "qs";

export const getCurrentUserFollow = (id) => {
  return getAuthorizedAxios().get(`mangas/${id}/my-follow`);
};

export const postFollow = (id) => {
  return getAuthorizedAxios().post(`mangas/${id}/my-follow`, {});
};

export const deleteFollow = (id) => {
  return getAuthorizedAxios().delete(`mangas/${id}/my-follow`);
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
