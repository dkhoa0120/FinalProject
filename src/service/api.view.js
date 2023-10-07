import { getAuthorizedAxios } from "./api.base";

export const postView = (type, typeId) => {
  return getAuthorizedAxios().post(`${type}s/${typeId}/my-view`, {});
};
