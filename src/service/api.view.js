import { getAuthorizedAxios } from "./api.base";

export const postView = (type, typeId) => {
  return getAuthorizedAxios().post(`user/view/${type}s/${typeId}`, {});
};
