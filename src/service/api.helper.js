import { helperAxios } from "./api.base";

export const getLanguage = () => {
  return helperAxios.get("/language");
};
