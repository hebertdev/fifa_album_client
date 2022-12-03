import { createContext, useState } from "react";
import { deleteToken } from "helpers/auth";
import axiosInstance from "helpers/axios";

//context
const UserContext = createContext();

//component context
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [totalPacks, setTotalPacks] = useState(0);
  const [loadingUser, setLoadingUser] = useState(true);

  async function logout() {
    try {
      await axiosInstance.get("/users/delete/token/");
      deleteToken();
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const data = {
    user,
    setUser,
    logout,
    setLoadingUser,
    loadingUser,
    totalPacks,
    setTotalPacks,
  };

  return (
    <>
      <UserContext.Provider value={data}>{children}</UserContext.Provider>
    </>
  );
};

export { UserProvider };
export default UserContext;
