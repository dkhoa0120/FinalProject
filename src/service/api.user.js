import { getAuthorizedAxios } from "./api.base";

export const getUsers = (filter) => {
  const search = filter?.search || "";
  const includeDeleted = filter?.includeDeleted || false;
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 12;
  const roleOption = filter?.roleOption || 0;

  return getAuthorizedAxios().get("manage/user", {
    params: { search, includeDeleted, page, pageSize, roleOption },
  });
};

export const updateRoles = (id, roles) => {
  return getAuthorizedAxios().put(`manage/user/${id}`, roles);
};
