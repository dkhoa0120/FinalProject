import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { extendToken, getCurrentUserBasic } from "../service/api.auth";

const UserContext = React.createContext({ email: "", auth: false, roles: [] });

function UserProvider({ children }) {
  const [user, setUser] = useState({ email: "", auth: false, roles: [] });

  useEffect(() => {
    const token = new Cookies().get("Token");
    if (token) {
      handleExtendToken();
      loginContext();
    }
  }, []);

  const loginContext = async () => {
    const response = await getCurrentUserBasic();
    setUser({
      email: response.data.email,
      roles: response.data.roles,
      auth: true,
    });
  };

  const handleExtendToken = async () => {
    const response = await extendToken();
    if (response && response.data.token && response.data.expiration) {
      new Cookies().set("Token", response.data.token, {
        path: "/",
        expires: new Date(response.data.expiration),
      });
    }
  };

  const logout = () => {
    new Cookies().remove("Token");
    setUser({
      email: "",
      auth: false,
      roles: [],
    });
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
