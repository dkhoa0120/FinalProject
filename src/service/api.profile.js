import { baseAxios } from "./api.base";

export const getProfileBasic = (id) => {
  return baseAxios.get(`profile/${id}`);
};

export const getProfileStats = (id) => {
  return baseAxios.get(`profile/${id}/stats`);
};
