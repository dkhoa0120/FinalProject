import Cookies from "universal-cookie";
import { userAxios } from "./api.base";

export const getCurrentUserRating = (id) => {
  return userAxios.get(`/rating/${id}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const postRating = (id, data) => {
  return userAxios.post(`/rating/${id}`, data, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};
