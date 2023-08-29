import { baseAxios, getAuthorizedAxios } from "./api.base";

export const signIn = (data) => {
  return baseAxios.post("account/signin", data);
};

export const signUp = (data) => {
  return baseAxios.post("account/signup", data);
};

export const extendToken = () => {
  return getAuthorizedAxios().post("account/extend");
};

export const getCurrentUserBasic = () => {
  return getAuthorizedAxios().get("profile/me");
};

export const getUserBasic = (id) => {
  return getAuthorizedAxios().get(`profile/${id}`);
};

export const changeUserAvatar = (formData) => {
  getAuthorizedAxios().put("profile/me/change-avatar", formData);
};
