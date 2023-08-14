import { baseAxios } from "./api.base";
import Cookies from "universal-cookie";

export const postView = (type, typeId) => {
  return baseAxios.post(
    `user/view/${type}s/${typeId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${new Cookies().get("Token")}`,
      },
    }
  );
};
