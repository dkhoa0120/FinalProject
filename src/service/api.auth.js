import Cookies from "universal-cookie";
import { accountAxios } from "./api.base";

export const signIn = (data) => {
  return accountAxios.post("/SignIn", data);
};

export const signUp = (data) => {
  return accountAxios.post("/SignUp", data);
};

export const getCurrentUserBasic = () => {
  return accountAxios.get("/user", {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};
