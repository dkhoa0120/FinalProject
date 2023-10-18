import { getAuthorizedAxios } from "./api.base";
import qs from "qs";

export const createJoinGroupRequest = (groupId) => {
  return getAuthorizedAxios().post(`groups/${groupId}/requests`);
};

export const getJoinGroupRequest = (groupId, filter) => {
  const search = filter?.search;
  const page = filter?.page;

  return getAuthorizedAxios().get(`groups/${groupId}/requests`, {
    params: { search, page },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const decideJoinGroupRequest = (requestId, data) => {
  return getAuthorizedAxios().put(`group-requests/${requestId}/status`, data);
};

//request page (users)
export const getUserGroupRequests = (filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`users/me/group-requests`, {
    params: { createdAtCursor },
  });
};

export const putUserGroupRequests = (requestId) => {
  return getAuthorizedAxios().put(`requests/${requestId}/status-confirm`);
};

//count noti request
export const countRequestsInGroupManage = (groupId) => {
  return getAuthorizedAxios().get(`groups/${groupId}/requests/count-noti`);
};

// request promotion

export const postPromotionRequest = (data) => {
  return getAuthorizedAxios().post(`promotion-requests`, data);
};

export const getUserPromotionRequests = (filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`users/me/promotion-requests`, {
    params: { createdAtCursor },
  });
};

// request manga

export const postMangaRequest = (data) => {
  return getAuthorizedAxios().post(`manga-requests`, data);
};

export const getUserMangaRequests = (filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`users/me/manga-requests`, {
    params: { createdAtCursor },
  });
};

// other request

export const postOtherRequest = (data) => {
  return getAuthorizedAxios().post(`other-requests`, data);
};

export const getUserOtherRequests = (filter) => {
  const createdAtCursor = filter?.createdAtCursor;
  return getAuthorizedAxios().get(`users/me/other-requests`, {
    params: { createdAtCursor },
  });
};

// manage promotion request

export const getPromotionRequests = (filter) => {
  const page = filter?.page;
  const pageSize = filter?.pageSize;
  return getAuthorizedAxios().get(`promotion-requests`, {
    params: { page, pageSize },
  });
};

export const decidePromotionRequest = (requestId, data) => {
  return getAuthorizedAxios().put(
    `promotion-requests/${requestId}/status`,
    data
  );
};

// manage manga request

export const getMangaRequests = (filter) => {
  const page = filter?.page;
  const pageSize = filter?.pageSize;
  return getAuthorizedAxios().get(`manga-requests`, {
    params: { page, pageSize },
  });
};

// manage other request

export const getOtherRequests = (filter) => {
  const page = filter?.page;
  const pageSize = filter?.pageSize;
  return getAuthorizedAxios().get(`other-requests`, {
    params: { page, pageSize },
  });
};

export const decideRequest = (requestId, data) => {
  return getAuthorizedAxios().put(`requests/${requestId}/status`, data);
};
