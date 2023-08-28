import { accountAxios, getAuthorizeAxios } from "./api.base";

export const signIn = (data) => {
  return accountAxios.post("/SignIn", data);
};

export const signUp = (data) => {
  return accountAxios.post("/SignUp", data);
};

export const extendToken = () => {
  return getAuthorizeAxios().post("/account/extend");
};

export const getCurrentUserBasic = () => {
  return getAuthorizeAxios().get("/account/user/me");
};

export const getUserBasic = (id) => {
  return getAuthorizeAxios().get(`/account/user/${id}`);
};
