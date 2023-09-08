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

export const changeUserAvatar = (formData) => {
  return getAuthorizedAxios().put("profile/me/change-avatar", formData);
};

export const changeUserBanner = (formData) => {
  return getAuthorizedAxios().put("profile/me/change-banner", formData);
};
