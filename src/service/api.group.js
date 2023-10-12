import { baseAxios, getAuthorizedAxios } from "./api.base";
import qs from "qs";

export const getUploadGroup = (id, filter) => {
  const joinedAtCursor = filter?.joinedAtCursor;
  return baseAxios.get(`users/${id}/groups`, {
    params: {
      joinedAtCursor,
    },
  });
};

export const getGroupInfo = (id) => {
  return baseAxios.get(`groups/${id}`);
};

export const getGroupMembers = (groupId, filter) => {
  const roleUpperBound = filter?.roleUpperBound;
  const roleLowerBound = filter?.roleLowerBound;
  const joinedAtCursor = filter?.joinedAtCursor;

  return baseAxios.get(`groups/${groupId}/members`, {
    params: {
      roleUpperBound,
      roleLowerBound,
      joinedAtCursor,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const getGroupUploadMangas = (groupId, filter) => {
  const updatedAtCursor = filter?.updatedAtCursor;

  return getAuthorizedAxios().get(`groups/${groupId}/chapters-by-manga`, {
    params: {
      updatedAtCursor,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const postGroup = (formData) => {
  return getAuthorizedAxios().post(`groups`, formData);
};

export const putGroup = (id, formData) => {
  return getAuthorizedAxios().put(`groups/${id}`, formData);
};

export const changeGroupAvatar = (id, formData) => {
  return getAuthorizedAxios().put(`groups/${id}/avatar`, formData);
};

export const changeGroupBanner = (id, formData) => {
  return getAuthorizedAxios().put(`groups/${id}/banner`, formData);
};

export const changeGroupRoles = (groupId, memberId, formData) => {
  return getAuthorizedAxios().put(
    `groups/${groupId}/members/${memberId}/group-roles`,
    formData
  );
};

export const joinGroup = (groupId) => {
  return getAuthorizedAxios().post(`groups/${groupId}/members`);
};

export const removeGroupMember = (groupId, memberId) => {
  return getAuthorizedAxios().delete(`groups/${groupId}/members/${memberId}`);
};

export const getMangaGroupForUpload = (userId) => {
  return getAuthorizedAxios().get(`users/${userId}/manga-groups`);
};

export const getMember = (groupId, memberId) => {
  return getAuthorizedAxios().get(`groups/${groupId}/members/${memberId}`);
};

export const getMembersToManage = (groupId, filter) => {
  const search = filter?.search;
  const groupRoleOptions = filter?.roleOption;
  const page = filter?.page;
  const pageSize = filter?.pageSize || 12;

  return getAuthorizedAxios().get(`groups/${groupId}/paginated-members`, {
    params: {
      search,
      groupRoleOptions,
      page,
      pageSize,
    },
    paramsSerializer: (params) => qs.stringify(params, { skipNulls: true }),
  });
};

export const getGroups = (filter) => {
  const search = filter?.search || "";
  return baseAxios.get("groups", {
    params: { search },
  });
};
