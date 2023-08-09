import { baseAxios } from "./api.base";

export const getChapterPages = (id) => {
  return baseAxios.get(`/chapters/${id}`);
};

export const getRelatedChapterPages = (id) => {
  return baseAxios.get(`/chapters/${id}/related-chapters`);
};
