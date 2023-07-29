import { userAxios } from "./api.base";
import Cookies from "universal-cookie";

export const getUserReactComment = (id) => {
  return userAxios.get(`/react/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const postReactComment = (id, data) => {
  return userAxios.post(`/react/comments/${id}`, data, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const putReactComment = (id, data) => {
  return userAxios.put(`/react/comments/${id}`, data, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};

export const deleteReactComment = (id) => {
  return userAxios.delete(`/react/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("Token")}`,
    },
  });
};
