import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getCurrentUserBasic } from "../service/Data.service";
// @function  UserContext
const UserContext = React.createContext({ email: "", auth: false });

// @function  UserProvider
// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const cookies = new Cookies();
  const [user, setUser] = useState({ email: "", auth: false });

  useEffect(() => {
    var token = cookies.get("Token");
    if (token) {
      loginContext();
    }
  }, []);

  const loginContext = async () => {
    let response = await getCurrentUserBasic();
    console.log(response);
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
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout, cookies }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
