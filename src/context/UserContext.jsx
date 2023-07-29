import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { extendToken, getCurrentUserBasic } from "../service/api.auth";

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
    const response = await getCurrentUserBasic();
    setUser({
      id: response.data.id,
      email: response.data.email,
      roles: response.data.roles,
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
    new Cookies().remove("Token", { path: "/" });
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loadUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
