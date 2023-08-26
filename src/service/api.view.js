import { getAuthorizeAxios } from "./api.base";

export const postView = (type, typeId) => {
  return getAuthorizeAxios().post(
    `user/view/${type}s/${typeId}`,
    {}
  );
};
