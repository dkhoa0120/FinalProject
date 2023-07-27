import Cookies from "universal-cookie";
import { userAxios } from "./api.base";

export const getCurrentUserFollow = (id) => {
  return userAxios.get(`/follow/mangas/${id}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const postFollow = (id) => {
  return userAxios.post(
    `/follow/mangas/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${new Cookies().get("Token")}`,
      },
    }
  );
};

export const deleteFollow = (id) => {
  return userAxios.delete(`/follow/mangas/${id}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};
