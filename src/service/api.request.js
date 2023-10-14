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
  return getAuthorizedAxios().put(`group-requests/${requestId}/status-confirm`);
};

//count noti request
export const countRequestsInGroupManage = (groupId) => {
  return getAuthorizedAxios().get(`groups/${groupId}/requests/count-noti`);
};
