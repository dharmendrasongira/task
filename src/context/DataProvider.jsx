import { createContext } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {

    
  return <Context.Provider values={""}>{children}</Context.Provider>;
};
