import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import * as accountApi from "../service/api.account";

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
    const response = await accountApi.getCurrentUserBasic();
    setUser({
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      avatarPath: response.data.avatarPath,
      roles: response.data.roles,
      biography: response.data.biography,
    });
  };

  const handleExtendToken = async () => {
    const response = await accountApi.extendToken();
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
