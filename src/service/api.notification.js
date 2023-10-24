import { getAuthorizedAxios } from "./api.base";
import qs from "qs";

export const getNotifications = (filter) => {
  const type = filter?.type;
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`my-notifications/`, {
    params: {
      type,
      createdAtCursor,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const getNotificationsCount = () => {
  return getAuthorizedAxios().get(`my-notifications/counts`);
};

export const putNotificationViewStatus = (notificationId) => {
  return getAuthorizedAxios().put(`my-notifications/${notificationId}/view`);
};
