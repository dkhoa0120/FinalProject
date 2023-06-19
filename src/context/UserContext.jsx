import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getCurrentUserBasic } from "../service/Data.service";

// @function  UserContext
const UserContext = React.createContext({ email: "", auth: false, roles: [] });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const cookies = new Cookies();

  const [user, setUser] = useState({ email: "", auth: false, roles: [] });

  useEffect(() => {
    const token = cookies.get("Token");
    if (token) {
      loginContext();
    }
  }, []); // Include cookies in the dependency array

  const loginContext = async () => {
    let response = await getCurrentUserBasic();

    setUser(() => ({
      email: response.data.email,
      roles: response.data.roles,
      auth: true,
    }));
  };

  const logout = () => {
    cookies.remove("Token");
    setUser(() => ({
      email: "",
      auth: false,
      roles: [],
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout, cookies }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
