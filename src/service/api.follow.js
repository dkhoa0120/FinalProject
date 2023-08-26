import { getAuthorizeAxios } from "./api.base";

export const getCurrentUserFollow = (id) => {
  return getAuthorizeAxios().get(`/user/follow/mangas/${id}`);
};

export const postFollow = (id) => {
  return getAuthorizeAxios().post(
    `/user/follow/mangas/${id}`,
    {}
  );
};

export const deleteFollow = (id) => {
  return getAuthorizeAxios().delete(`/user/follow/mangas/${id}`);
};
