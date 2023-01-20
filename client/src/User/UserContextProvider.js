import React, { createContext, useState } from "react";
export const UseContext = createContext(
  {
  user: {
    id: "",
    nickname: "",
    profile_image: "",
    address: "",
  },
  setUsers: () => {},
}
);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    nickname: "",
    profile_image: "",
    address: "",
  });

  const setUserHandler = (data) => setUser(data);

  const usercontext = {
    user: user,
    setUsers: setUserHandler,
  };


  return (
    <UseContext.Provider value={usercontext}>{children}</UseContext.Provider>
  );
};

export default UserContextProvider;
