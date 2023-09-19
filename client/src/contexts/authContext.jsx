import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const user = {
    email: "test",
    id: 1,
    nickname: "test",
    profileicon: "/img/profileImg.jpg",
    profileimg: "/img/proPic.jpg",
    username: "test",
  };

  const [currentUser, setCurrentUser] = useState({});

  const login = (input) => {
    try {
      if (input.email === "test" && input.password == "test") {
        setCurrentUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
