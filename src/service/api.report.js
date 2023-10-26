import { getAuthorizedAxios } from "./api.base";

export const getReports = (filter) => {
  const status = filter?.status;
  const page = filter?.page || 1;
  return getAuthorizedAxios().get(`reports`, {
    params: {
      status,
      page,
    },
  });
};

export const createReport = (data) => {
  return getAuthorizedAxios().post(`reports`, data);
};

export const putReportStatus = (id, data) => {
  return getAuthorizedAxios().put(`reports/${id}/status`, data);
};

export const banUser = (id, data) => {
  return getAuthorizedAxios().put(`manage/users/${id}/ban`, data);
};

export const unbanUser = (id) => {
  return getAuthorizedAxios().put(`manage/users/${id}/unban`);
};
