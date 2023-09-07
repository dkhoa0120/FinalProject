import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import * as authApi from "../service/api.auth";
import * as groupApi from "../service/api.chapter";

const UserContext = React.createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const groupOptions = groups?.map((group) => ({
    value: group.id,
    label: group.name,
  }));

  useEffect(() => {
    const token = new Cookies().get("Token");
    if (token) {
      handleExtendToken();
      loadUser();
      fetchGroupOptions();
    }
  }, []);

  const loadUser = async () => {
    const response = await authApi.getCurrentUserBasic();
    setUser({
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      avatarPath: response.data.avatarPath,
      roles: response.data.roles,
    });
  };

  const fetchGroupOptions = async () => {
    try {
      let res = await groupApi.getUploadGroup();
      setGroups(res.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setGroups([]);
      }
    }
  };

  const handleExtendToken = async () => {
    const response = await authApi.extendToken();
    if (response && response.data.token && response.data.expiration) {
      new Cookies().set("Token", response.data.token, {
        path: "/",
        expires: new Date(response.data.expiration),
      });
    }
  };

  const logout = () => {
    new Cookies().remove("Token", { path: "/" });
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, loadUser, logout, setUser, groups, groupOptions }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
