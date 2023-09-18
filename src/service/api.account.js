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
  return getAuthorizedAxios().get("account/me");
};

export const changeUserAvatar = (formData) => {
  return getAuthorizedAxios().put("account/me/change-avatar", formData);
};

export const changeUserBanner = (formData) => {
  return getAuthorizedAxios().put("account/me/change-banner", formData);
};

export const getProfileBasic = (id) => {
  return baseAxios.get(`account/${id}`);
};

export const getProfileStats = (id) => {
  return baseAxios.get(`account/${id}/stats`);
};
