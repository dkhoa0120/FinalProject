import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import * as authApi from "../service/api.auth";

const UserContext = React.createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = new Cookies().get("Token");
    if (token) {
      handleExtendToken();
      loadUser();
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
    <UserContext.Provider value={{ user, loadUser, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
