import { getManageAxios } from "./api.base";

export const getUsers = (filter) => {
  const search = filter?.search || "";
  const excludeDeleted = filter?.excludeDeleted || false;
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 12;
  const roleOption = filter?.roleOption || 0;

  return getManageAxios().get("/user", {
    params: { search, excludeDeleted, page, pageSize, roleOption },
  });
};

export const updateRoles = (id, roles) => {
  return getManageAxios().put(`user/${id}`, roles);
};
