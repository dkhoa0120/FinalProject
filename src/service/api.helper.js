import { baseAxios } from "./api.base";

export const getLanguage = () => {
  return baseAxios.get("helper/language");
};
