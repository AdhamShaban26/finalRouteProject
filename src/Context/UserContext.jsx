import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export default function UserContext({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  

  useEffect(() => {
    if (localStorage.getItem("token")) {
     
      setToken(localStorage.getItem("token"));
      setUserId(localStorage.getItem("user"));
    }
  },[]);

  return (
    <userContext.Provider value={{ token, setToken,userId,setUserId }}>
      {children}
    </userContext.Provider>
  );
}
