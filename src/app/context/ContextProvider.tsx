import React, { Children, ReactNode, useState } from "react"
import Cookies from "universal-cookie"
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();
  if (!cookies.get("accesToken")) localStorage.removeItem("memberItem");

  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memeberData") ? JSON.parse(localStorage.getItem("memberData") as string) : null
  );
  console.log("==== verify ====")
  return (<GlobalContext.Provider value={{ authMember, setAuthMember }}>{children}</GlobalContext.Provider>)
};

export default ContextProvider;